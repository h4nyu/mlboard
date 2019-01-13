export default {
  name: 'SearchInput',
  data(){
    return {
      inputValue: "",
    }
  },
  props:{
    placeholder: String,
  },
  watch:{
    inputValue(newValue, oldValue){
      this.$emit('input', newValue)
    },
  },
  render: function render(h) {
    const bindTarget = this.inputValue;
    return (
      <p class="control has-icons-left has-icons-right">
        <input class="input" placeholder={this.placeholder} vModel={this.inputValue}></input>
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    )
  }
};
