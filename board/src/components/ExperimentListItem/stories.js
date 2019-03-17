import { storiesOf } from '@storybook/vue'
import * as ms from "@/services/models"
import Component from '.'
import uuid from "uuid";
import moment from "moment";

storiesOf(`${Component.name}`, module)
  .add('default', () => ({
    render(h) {
      const experiment = new ms.Experiment({
        id: uuid(),
        tag: "aaa",
        config: {
          foo: "foo",
          bar: "bar"
        }
      });
      return (
        <Component 
          experiment={experiment}
          vOn:deleteClick={x => alert(`deleteClick, ${JSON.stringify(x)}`)}
          vOn:chartClick={x => alert(`chartClick, ${JSON.stringify(x)}`)}
        />
      )
    }
  }))
