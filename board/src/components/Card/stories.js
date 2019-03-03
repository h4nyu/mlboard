import { storiesOf } from '@storybook/vue'
import Card from './index.js'
import moment from "moment";

storiesOf('Card', module)
  .add('default', () => ({
    render(h) {
      return (
        <Card />
      )
    }
  }))

