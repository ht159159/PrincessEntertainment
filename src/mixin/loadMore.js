export default {
  data() {
    return {
      timer: ""
    };
  },
  methods: {
    $scrollLoad(func, e) {
      if (
        e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 10
      ) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          func(e);
        }, 40);
      }
    }
  }
};
