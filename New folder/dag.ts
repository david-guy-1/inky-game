import _ from "lodash";

function union<T>(x : Set<T>, y : Set<T>) : Set<T>{
	return  new Set(_.union(Array.from(x), Array.from(y)));
}


class vertex<T>{
	name : T
	pred : Set<vertex<T>>
	succ : Set<vertex<T>>
	next : Set<vertex<T>>
	prev : Set<vertex<T>>
    constructor(name : T){
        this.name = name
		// (possibly not immediate) predecessor and successors
        this.pred = new Set();
        this.succ = new Set();
		// immediate predecessors and successors
        this.next = new Set();
        this.prev = new Set();
    }
}





class dag<T extends string | number >{
	// vertices : list (not set) of strings
	// edges : list (not set) of pairs of strings
	vertices : Set<vertex<T>>
	verticesTable : Partial<Record<T, vertex<T>>>
	constructor(vertices : T[], edges :[T, T][]){
		this.vertices = new Set(vertices.map(x => new vertex(x)));
		this.verticesTable = {}
		for(var vertex_ of this.vertices){
			this.verticesTable[vertex_.name] = vertex_;
		}
		for (var edge of edges){
			this.add_edge(edge[0], edge[1]);
		}

	}
	//string
	add_vertex(name : T){ // cannot remove vertices
		var vertex_ = new vertex(name);
		this.vertices.add(vertex_);
		this.verticesTable[name] =vertex_;
	}
	get_vertices(){
		return Array.from(this.vertices).map((x) => x.name);
	}
	//strings
	add_edge(v1 : T, v2  : T, check_redundant : boolean = true) : void{
		if(this.has_edge(v1, v2) || v1 == v2){
			return;
		}
		// no redundant edges
		if(check_redundant && Array.from(this.get_vertex_by_name(v1).succ).map((x) => x.name).indexOf(v2) != -1){
			return;
		}
		var v1obj = this.get_vertex_by_name(v1);
		var v2obj = this.get_vertex_by_name(v2);
		
		if(v2obj.succ.has(v1obj)){
			throw new Error("this edge will create a cycle")
		}
		
		v1obj.next.add(v2obj)
		v2obj.prev.add(v1obj)
		v1obj.succ.add(v2obj)
		v2obj.pred.add(v1obj)
		// every successor of v2 is also a successor of v1 now
		for(var vertex of v1obj.pred){
			vertex.succ.add(v2obj)
			vertex.succ = union(vertex.succ, v2obj.succ)
		}
		for(var vertex of v2obj.succ){
			vertex.pred.add(v1obj)
			vertex.pred = union(vertex.pred, v1obj.pred)
		}
		v1obj.succ = union(v1obj.succ, v2obj.succ)
		v2obj.pred = union(v1obj.pred, v2obj.pred)
	} // CANNOT remove edges!!!
	
	
	get_vertex_by_name(name : T) : vertex<T>{
		return this.verticesTable[name] as vertex<T>;
	}
	// returns a list of vertices that are not in the list but all pre-requisites are in the list
	get_exposed_vertices(set_ : Set<T>) : Set<T>{
		var exposed : Set<T>= new Set();
		for(var vertex of this.vertices){
			if(set_.has(vertex.name)){
				continue;
			}
			var valid = true;
			for(var prev of vertex.prev){
				if(!set_.has(prev.name)){
					valid = false;
					break;
				}
			}
			if(valid){
				exposed.add(vertex.name);
			}
		}
		return exposed;
	}
	// strings
	has_edge(v1 : T, v2 : T){ // v1 -> v2 is an edge
		return this.get_vertex_by_name(v1).next.has(this.get_vertex_by_name(v2))
	}
	// list of strings
	subgraph(vertices : Set<T>){
		var vertex_set = vertices;
		var edge_set : [T, T][] = [];
		for(var x of vertices){
			for(var y of vertices){
				if(this.has_edge(x,y)){
					edge_set.push([x,y])
				}
			}
		}
		return new dag(Array.from(vertex_set), edge_set);
	}
	// list of strings
	subgraph_without(vertices : Set<T>){
		var vertex_set : Set<T> = new Set();
		for(var vertex of this.vertices){
			if(!vertices.has(vertex.name)){
				vertex_set.add(vertex.name);
			}
		}
		return this.subgraph(vertex_set);
	}
	// returns just the list of names
	toposort(){
		var prev : Partial<Record<T, Set<T>>> = {};
		var next  : Partial<Record<T, Set<T>>>  = {};
		var frontier : Set<T> = new Set();
		var toposort : T[] = [];
		//initialize variables
		for(var vertex of this.vertices){
			prev[vertex.name] = new Set(Array.from(vertex.prev).map((x) => x.name))
			next[vertex.name] = new Set(Array.from(vertex.next).map((x) => x.name))
			if(prev[vertex.name]?.size == 0){
				frontier.add(vertex.name)
			}
		}
		//main loop
		while(frontier.size != 0){
			var vertex_ = Array.from(frontier)[0];
			frontier.delete(vertex_);
			toposort.push(vertex_)
			for (var vertex2 of next[vertex_] as Set<T>){
				prev[vertex2]?.delete(vertex_);
				if(prev[vertex2]?.size == 0){
					frontier.add(vertex2);
				}
			}
		}
		return toposort;
	}
	// to be used here:
	//https://codepen.io/mauriciom/pen/ZbXmYb
	// or a.html, that works too
	output(){
		var sort = this.toposort();
		var preamble = 
		`		
		
		<html>
 <head>
  <script type="text/javascript">
   window.onload = function() {
   
   var cy = cytoscape({
  container: document.getElementById('canvas'),
  
  style: [
    {
        selector: 'node',
        style: {
            label: 'data(id)'
        }
    }, {
		selector:"edge",
		style:{
		"curve-style":"straight",
			"mid-target-arrow-color":"red",
			"mid-target-arrow-shape":"triangle",
			"target-arrow-color":"red",
			"target-arrow-shape":"triangle"			
		}
	
	}]
	
});

var eles = cy.add([
`			
			var mid = "";
			var i=0;
			for(var v of  sort){
				i += 1600 / (this.vertices.size+1)
				mid += `{ group: 'nodes', data: { id: '${v}' }, position: { x: ${i}, y: ${Math.random() * 650 + 100} } },
				`;
			}
			for(var v2 of  this.vertices){
				for(var w of v2.next){
					mid += ` { group: 'edges', data: { id: '${v2.name + " " + w.name}', source: '${v2.name}', target: '${w.name}' } },
					`;
				}
			}

		var postamble = `]);


cy.resize();

cy.mount()
   };
  </script>
  
  <style>
    #canvas {
        width: 1600;
        height: 750;
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>


 </head>
 
 <body>
  <div id="canvas"></div>
   <div>
        </div>
	
			<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.15.2/cytoscape.min.js"></script>
			
			
			<script type="text/javascript" src="a.js"></script>
 </body>
</html>



`
		return preamble + mid + postamble;
	}
	toJSON() : {"vertices" : T[], "adjacency list" : Partial<Record<T, T[]>> } {
		var adjList : Partial<Record<T, T[]>> =  {};
		for(var vertex of this.vertices){
			adjList[vertex.name] = [];
			for(var next of vertex.next){
				adjList[vertex.name]?.push(next.name);
			}
		}
		return {
				"vertices" : Array.from(this.vertices).map((x) => x.name),
				"adjacency list": adjList,
			}
		
	}

}
export default dag;