import style from './style.scss?module';
import fp from "lodash/fp";

export default {
  name: 'SwitchInput',
  props: {
    value: {
      required: false,
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      domValue: false,
    };
  },
  methods:{
    handleClick() {
      this.$emit('click', { isChecked: this.domValue });
    },
    syncValue() {
      this.domValue = this.value;
    },
  },
  watch: {
    domValue() {
    },
  },
  render(){
    let slider;
    if(this.domValue){
      slider = (
        <div class={[style.slider]}></div>
      )
    }else{
      slider = (
        <div class={[style.slider, style.unckecked]}></div>
      )
    }

    return (
      <label class={[style.container]} vOn:click={this.handleClick}>
        <label class={[style.circle]} />
        <input ref="input" type="checkbox" class={style.input} vModel={this.domValue}/>
        {slider}
      </label>
    )
  }
};
