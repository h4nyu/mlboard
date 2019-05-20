import style from './style.css?module';
import TheExperimentList from '@/connectors/TheExperimentList';
import TheTraceGroupList from '@/connectors/TheTraceGroupList';
import TheHeaderNav from '@/connectors/TheHeaderNav';
import TheTracePlotList from '@/connectors/TheTracePlotList';

export default {
  name: 'TracePage',
  render() {
    return (
      <div class={[style.layout]}>
        <TheHeaderNav class={[style.header]}/>
        <TheExperimentList class={[style.experiment]}/>
        <TheTraceGroupList class={[style.trace]}/>
        <TheTracePlotList class={[style.plot]}/>
      </div>
    );
  },
};
