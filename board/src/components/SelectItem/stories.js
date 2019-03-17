import { storiesOf } from '@storybook/vue'
import Component from '.'
import moment from "moment";

storiesOf(`${Component.name}`, module)
  .add('selected', () => ({
    render(h) {
      return (
        <Component isSelected={true}>
          <div> content here !</div>
        </Component>
      )
    }
  }))
  .add('unselected', () => ({
    render(h) {
      return (
        <Component isSelected={false}>
          <div> content here !</div>
        </Component>
      )
    }
  }))
