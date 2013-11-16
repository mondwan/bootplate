enyo.kind({
	name:"GW2_Match_Table",
	kind:"FittableRows",
	components:[
		{tag:"input", name:"searchWorldId"},
		{tag:"button", content:"Search", ontap:"search"},
		{kind: "enyo.Scroller", 
			vertical:"scroll",
			fit: true, components: [
			{name: "world_target", style:"width:1000px;height:300px", allowHtml: true},
			{name: "world_all", style:"float:none", allowHtml: true}
		]}
	],
	search:function(){
		var w_id = this.$.searchWorldId.hasNode().value;
		var req = new enyo.Ajax({
			url:"https://api.guildwars2.com/v1/wvw/matches.json"
		});
		req.response(enyo.bind(this, "processSearchResult"));
		//No parameter needed 
		req.go();
	},
	processSearchResult:function(inReq, inRes){
		console.log("inReq", inReq, "inRes", inRes);
		console.log("arguments", arguments);
		if (!inReq) return;
		this.$.world_all.destroyClientControls();
		this.$.world_target.destroyClientControls();
		enyo.forEach(inRes.wvw_matches, this.addMatch, this);
		enyo.forEach(inRes.wvw_matches, this.addTargetMatch, this);
		this.$.world_target.render();
		this.$.world_all.render();
	},
	addTargetMatch:function(inResult){
		var v = this.$.searchWorldId.hasNode().value;
		if (inResult.wvw_match_id == v)
			this.createComponent({
				kind:"GW2_Match",
				name:inResult.wvw_match_id + "t",
				container:this.$.world_target,
				"wvw_match_id": inResult.wvw_match_id,
				"red_world_id": inResult.red_world_id,
				"blue_world_id": inResult.blue_world_id,
				"green_world_id": inResult.green_world_id,
				"start_time": inResult.start_time,
				"end_time": inResult.end_time
			});
	},
	addMatch:function(inResult){
		this.createComponent({
			kind:"GW2_Match",
			name:inResult.wvw_match_id,
			container:this.$.world_all,
			"wvw_match_id": inResult.wvw_match_id,
			"red_world_id": inResult.red_world_id,
			"blue_world_id": inResult.blue_world_id,
			"green_world_id": inResult.green_world_id,
			"start_time": inResult.start_time,
			"end_time": inResult.end_time
		});
	}
});
