export default {
	data() {
		return {
			islogin: false
		}
	},
	methods: {
		onFn(data) {
			if (!!data) {
				this.$router.push(data);
			}
			this.$store.commit("setTransition", "turn-on");
		},
		offFn(data) {
			if (!!data) {
				this.$router.push(data);
			} else {
				this.$router.back(-1);
			}
			this.$store.commit("setTransition", "turn-off");
		}
	}
}