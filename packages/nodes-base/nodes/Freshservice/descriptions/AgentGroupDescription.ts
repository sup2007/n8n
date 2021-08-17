import {
	INodeProperties,
} from 'n8n-workflow';

export const agentGroupOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an agent group',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an agent group',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an agent group',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve all agent groups',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an agent group',
			},
		],
		default: 'create',
	},
] as INodeProperties[];

export const agentGroupFields = [
	// ----------------------------------------
	//            agentGroup: create
	// ----------------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Escalate To',
				name: 'escalate_to',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: [
						'getAgents',
					],
				},
				description: 'ID of the user to whom an escalation email is sent if a ticket in this group is unassigned',
			},
			{
				displayName: 'Members',
				name: 'members',
				type: 'multiOptions',
				default: [],
				description: 'Comma-separated IDs of agents who are members of this group',
				typeOptions: {
					loadOptionsMethod: [
						'getAgents',
					],
				},
			},
			{
				displayName: 'Observers',
				name: 'observers',
				type: 'multiOptions',
				default: [],
				description: 'Comma-separated agent IDs who are observers of this group',
				typeOptions: {
					loadOptionsMethod: [
						'getAgents',
					],
				},
			},
			{
				displayName: 'Unassigned For',
				name: 'unassigned_for',
				description: 'Time after which an escalation email is sent if a ticket in the group remains unassigned',
				type: 'options',
				default: '30m',
				options: [
					{
						name: '30 Minutes',
						value: '30m',
					},
					{
						name: '1 Hour',
						value: '1h',
					},
					{
						name: '2 Hours',
						value: '2h',
					},
					{
						name: '8 Hours',
						value: '8h',
					},
					{
						name: '12 Hours',
						value: '12h',
					},
					{
						name: '1 Day',
						value: '1d',
					},
					{
						name: '2 Days',
						value: '2d',
					},
					{
						name: '3 Days',
						value: '3d',
					},
				],
			},
		],
	},

	// ----------------------------------------
	//            agentGroup: delete
	// ----------------------------------------
	{
		displayName: 'Agent Group ID',
		name: 'agentGroupId',
		description: 'ID of the agent group to delete',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'delete',
				],
			},
		},
	},

	// ----------------------------------------
	//             agentGroup: get
	// ----------------------------------------
	{
		displayName: 'Agent Group ID',
		name: 'agentGroupId',
		description: 'ID of the agent group to retrieve',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'get',
				],
			},
		},
	},

	// ----------------------------------------
	//            agentGroup: getAll
	// ----------------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'How many results to return',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
	},

	// ----------------------------------------
	//            agentGroup: update
	// ----------------------------------------
	{
		displayName: 'Agent Group ID',
		name: 'agentGroupId',
		description: 'ID of the agent group to update',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'update',
				],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'agentGroup',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Escalate To',
				name: 'escalate_to',
				type: 'options',
				default: '',
				description: 'ID of the agent to whom an escalation email is sent if a ticket in this group is unassigned',
				typeOptions: {
					loadOptionsMethod: [
						'getAgents',
					],
				},
			},
			{
				displayName: 'Members',
				name: 'members',
				type: 'multiOptions',
				default: [],
				description: 'Comma-separated IDs of agents who are members of this group',
				typeOptions: {
					loadOptionsMethod: [
						'getAgents',
					],
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Observers',
				name: 'observers',
				type: 'multiOptions',
				default: [],
				description: 'Comma-separated agent user IDs who are observers of this group',
				typeOptions: {
					loadOptionsMethod: [
						'getAgents',
					],
				},
			},
			{
				displayName: 'Unassigned For',
				name: 'unassigned_for',
				description: 'Time after which an escalation email is sent if a ticket in the group remains unassigned',
				type: 'options',
				default: '30m',
				options: [
					{
						name: '30 Minutes',
						value: '30m',
					},
					{
						name: '1 Hour',
						value: '1h',
					},
					{
						name: '2 Hours',
						value: '2h',
					},
					{
						name: '8 Hours',
						value: '8h',
					},
					{
						name: '12 Hours',
						value: '12h',
					},
					{
						name: '1 Day',
						value: '1d',
					},
					{
						name: '2 Days',
						value: '2d',
					},
					{
						name: '3 Days',
						value: '3d',
					},
				],
			},
		],
	},
] as INodeProperties[];