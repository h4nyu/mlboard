import { storiesOf } from '@storybook/vue'
import * as ms from "@/services/models"
import Component from '.'
import uuid from "uuid";
import moment from "moment";

storiesOf(`${Component.name}`, module)
  .add('default', () => ({
    render(h) {
      const experiments = [
        new ms.Experiment({
          id: uuid(),
          tag: "aaa",
          config: {
            foo: "foo",
            bar: "bar"
          }
        }),
        new ms.Experiment({
          id: uuid(),
          tag: "bbb",
          config: {
            foo: "baz",
            bar: "sfsd"
          }
        }),
      ];
      return (
        <Component 
          experiments={experiments}
          vOn:refresh={x => alert(`refresh`)}
          vOn:deleteClick={x => alert(`deleteClick, ${JSON.stringify(x)}`)}
        />
      )
    }
  }))

