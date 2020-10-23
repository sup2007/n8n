import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	handleMatrixCall,
	matrixApiRequest,
} from './GenericFunctions';

import {
	accountOperations
} from './AccountDescription';

import {
	eventFields,
	eventOperations,
} from './EventDescription';

import {
	mediaFields,
	mediaOperations,
} from './MediaDescription';

import {
	messageFields,
	messageOperations,
} from './MessageDescription';

import {
	roomFields,
	roomOperations,
} from './RoomDescription';

import {
	roomMemberFields,
	roomMemberOperations,
} from './RoomMemberDescription';

export class Matrix implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Matrix',
		name: 'matrix',
		icon: 'file:matrix.png',
		group: ['output'],
		version: 1,
		description: 'Consume Matrix API',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Matrix',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'matrixApi',
				required: true,
			},
		],
		properties: [

			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Room',
						value: 'room',
					},
					{
						name: 'Room Member',
						value: 'roomMember',
					},
				],
				default: 'message',
				description: 'The resource to operate on.',
			},
			...accountOperations,
			...eventOperations,
			...eventFields,
			...mediaOperations,
			...mediaFields,
			...messageOperations,
			...messageFields,
			...roomOperations,
			...roomFields,
			...roomMemberOperations,
			...roomMemberFields,
		],
	};


	methods = {
		loadOptions: {
			async getChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				const joinedRoomsResponse = await matrixApiRequest.call(this, 'GET', '/joined_rooms');

				await Promise.all(joinedRoomsResponse.joined_rooms.map(async (roomId: string) => {
					try {
						const roomNameResponse = await matrixApiRequest.call(this, 'GET', `/rooms/${roomId}/state/m.room.name`);
						returnData.push({
							name: roomNameResponse.name,
							value: roomId,
						});
					} catch (e) {
						// TODO: Check, there is probably another way to get the name of this private-chats
						returnData.push({
							name: `Unknown: ${roomId}`,
							value: roomId,
						});
					}
				}));

				returnData.sort((a, b) => {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				});

				return returnData;
			},
		},
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData() as IDataObject[];
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			const responseData = await handleMatrixCall.call(this, items[i], i, resource, operation);
			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData as IDataObject);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}