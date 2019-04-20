import style from './style.css?module';

console.log(style);
export default {
  name: 'Switch',
  render(){
    return (
      <label class={[style.switch, "is-info"]}>
        <input type="checkbox"/>
        <span class={[style.slider, style.round]}></span>
      </label>
    )
  }
};
