enyo.kind({
	name:"GW2_Match",
	kind:enyo.Control,
	tag:"div",
	style:"float:left; height:300px; width:400px",
	published:{
		"wvw_match_id": "",
		"red_world_id": "",
		"blue_world_id": "",
		"green_world_id": "",
		"start_time": "",
		"end_time": ""
	},
	components:[
		{tag:"p", name:"wvw_match_id"},
		{tag:"p", name:"start_time"},
		{tag:"p", name:"end_time"},
		{kind:"GW2_World", name:"red"},
		{kind:"GW2_World", name:"green"},
		{kind:"GW2_World", name:"blue"}
	],
	create:function(){
		this.inherited(arguments);
		var list = ["red", "blue", "green"];
		for (var i = 0; l = list[i] ; i++) {
			this.$[l].world_id = this[l+"_world_id"];
			this.$[l].color = l;
			this.$[l].colorChanged();
			this.$[l].worldIdChanged();
		}

		this.$.start_time.setContent(this.start_time);
		this.$.end_time.setContent(this.end_time);
		this.$.wvw_match_id.setContent(this.wvw_match_id);
	}
});

enyo.kind({
	name:"GW2_World",
	kind:enyo.Control,
	tag:"div",
	style:"border: 1px solid black; float:left; width:100px; height:100px",
	published:{
		color:"",
		world_id:""
	},
	create:function () {
		this.inherited(arguments);
		this.colorChanged();
		this.worldIdChanged();
	},
	components:[
		{
			tag:"p",
			name:"color",
		},
		{
			tag:"p",
			name:"world_id",
		}
	],
	colorChanged:function(){
		this.$.color.setContent(this.color);
	},
	worldIdChanged:function(){
		this.$.world_id.setContent(this.world_id);
	}
});
