import Graph from "../Graph";
import GraphVertex from "../GraphVertex";
import GraphEdge from "../GraphEdge";

describe("Graph", () => {
  it("should add vertices to graph", () => {
    const graph = new Graph();

    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    graph.addVertex(vertexA).addVertex(vertexB);

    expect(graph.toString()).toBe("A,B");
    expect(graph.getVertexByKey(vertexA.getKey())).toEqual(vertexA);
    expect(graph.getVertexByKey(vertexB.getKey())).toEqual(vertexB);
  });

  it("should add edges to the undirected graph.", () => {
    const graph = new Graph();

    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    expect(graph.getAllVertices().length).toBe(2);
    expect(graph.getAllVertices()[0]).toEqual(vertexA);
    expect(graph.getAllVertices()[1]).toEqual(vertexB);

    const graphVertexA = graph.getVertexByKey(vertexA.getKey());
    const graphVertexB = graph.getVertexByKey(vertexB.getKey());

    expect(graph.toString()).toBe("A,B");
    expect(graphVertexA).toBeDefined();
    expect(graphVertexB).toBeDefined();

    expect(graph.getVertexByKey("not existing")).toBeUndefined();

    expect(graphVertexA.getNeighbors().length).toBe(1);
    expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB);
    expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB);

    expect(graphVertexB.getNeighbors().length).toBe(1);
    expect(graphVertexB.getNeighbors()[0]).toEqual(vertexA);
    expect(graphVertexB.getNeighbors()[0]).toEqual(graphVertexA);
  });

  it("should add edges to directed graph", () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    const graphVertexA = graph.getVertexByKey(vertexA.getKey());
    const graphVertexB = graph.getVertexByKey(vertexB.getKey());

    expect(graph.toString()).toBe("A,B");
    expect(graphVertexA).toBeDefined();
    expect(graphVertexB).toBeDefined();

    expect(graphVertexA.getNeighbors().length).toBe(1);
    expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB);
    expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB);

    expect(graphVertexB.getNeighbors().length).toBe(0);
  });

  it("should find edge by vertices in directed graph", () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexA, vertexC);
    const graphEdgeCA = graph.findEdge(vertexC, vertexA);

    expect(graphEdgeAC).toBeNull();
    expect(graphEdgeCA).toBeNull();
    expect(graphEdgeBA).toBeNull();
    expect(graphEdgeAB).toEqual(edgeAB);
    expect(graphEdgeAB.weight).toBe(10);
  });

  it("should return vertex neighbors", () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph.addEdge(edgeAB).addEdge(edgeAC);

    const neighbors = graph.getNeighbors(vertexA);

    expect(neighbors.length).toBe(2);
    expect(neighbors[0]).toEqual(vertexB);
    expect(neighbors[1]).toEqual(vertexC);
  });

  it("should throw an error when trying to add edge twice", () => {
    function addSameEdgeTwice() {
      const graph = new Graph(true);

      const vertexA = new GraphVertex("A");
      const vertexB = new GraphVertex("B");

      const edgeAB = new GraphEdge(vertexA, vertexB);

      graph.addEdge(edgeAB).addEdge(edgeAB);
    }

    expect(addSameEdgeTwice).toThrow();
  });

  it("should return the list of all added edges", () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);

    graph.addEdge(edgeAB).addEdge(edgeBC);

    const edges = graph.getAllEdges();

    expect(edges.length).toBe(2);
    expect(edges[0]).toEqual(edgeAB);
    expect(edges[1]).toEqual(edgeBC);
  });
});
