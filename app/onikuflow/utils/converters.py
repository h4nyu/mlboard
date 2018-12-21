import networkx as nx
import pygraphviz as pgv

def dot_to_dict(dot_str):
    graph_dot = pgv.AGraph(dot_str)
    graph_netx = nx.nx_agraph.from_agraph(graph_dot)
    return nx.readwrite.json_graph.node_link_data(graph_netx)
