import style from './style.css?module';
import moment from "moment";

export default {
  name: 'Breadcrumb',
  props: {
    levels: {
      required: true,
      type: Array,
    },
  },
  render() {
    return (
      <div class="breadcrumb">
        <ul>
          {
            this.levels.map(x => (
              <li> {x} </li>
            ))
          }
        </ul>
      </div>
    );
  },
};

