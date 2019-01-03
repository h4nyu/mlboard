import styles from '@/App/style.scss'

import TreeView from "vue-json-tree-view/src/TreeView"
import TreeViewItem from "vue-json-tree-view/src/TreeViewItem"
import TreeViewItemValue from "vue-json-tree-view/src/TreeViewItemValue"
console.log(styles);

export default {
  name: 'ExperimentList',
  components:{
    TreeView,
    TreeViewItem,
    TreeViewItemValue,
  },
  render: function render(h) {
    return (
      <tree-view data={{aaa: 'aaaa'}} options={{maxDepth: 3}}></tree-view>
    )
  }
};
