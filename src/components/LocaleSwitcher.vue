<template>
	<!-- <ul>
		<li 
			v-for="locale in supportedLocales" 
			:key="locale" @click="switchLocale(locale)"
		>
			{{ $t(locale) }}
		</li>
	</ul> -->
	

	<v-select class=" mb-3"
		:items="supportedLocales"
		label=""
		outlined
		v-model="defaultLang"
		@change="switchLocale"
	></v-select>
</template>

<script>

	import { Trans } from '@/plugins/Translation'

	export default {
		name: 'LocaleSwitcher',
		data: () => ({
			defaultLang: 'en',
		}),
		computed: {
			supportedLocales () {
				return Trans.supportedLocales
			},
		},
		methods: {
			switchLocale(locale) {
				if (this.$i18n.locale !== locale) {
					const to = this.$router.resolve({ params: {locale} })
					return Trans.changeLocale(locale).then(() => {
						this.$router.push(to.location)
					})
				}
			}
		}
	}
</script>

<style scoped>
	li {
		text-decoration: underline;
		color: #459CE7;
		cursor: pointer;
	}
</style>
