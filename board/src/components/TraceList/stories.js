import { storiesOf } from '@storybook/vue'
import TraceList from './index.js'
import moment from "moment";

storiesOf('TraceList', module)
  .add('default', () => ({
    render(h) {
      return (
        <TraceList />
      )
    }
  }))
