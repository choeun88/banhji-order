<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="">
			<v-tabs
				vertical
				class="tab_setting tab_product_service_show"
				slider-color="grayBg"
				slider-size="7">
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{ $t("employee_center") }}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{ $t("department_and_position") }}
					</span>
				</v-tab>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="pa-0">
							<EmployeeCenter />
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0 pr-0">
							<DepartmentAndPosition />
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</v-col>
	</v-row>
</template>

<script>
	import DepartmentAndPosition from "@/views/payroll/settings/departmentPosition/DepartmentAndPosition"
	export default {
		data: () => ({}),
		props: {},
		methods: {
			clickMe(data) {
				this.$router.push(`${data.link}`);
			}
		},
		components: {
      EmployeeCenter: () => import("@/views/payroll/employee/EmployeesVendor.vue"),
			DepartmentAndPosition,
		},
	};
</script>
<style scoped>
	.v-tab {
		justify-content: left !important;
		text-align: left !important;
		font-size: 16px;
		height: 55px !important;
	}
	.v-tab--active {
		background-color: rgb(255, 255, 255);
	}
	.v-tab--active {
		background-color: #ffffff !important;
		border-bottom: 4px solid #92d050;
		border-left: none;
	}
	.tab_setting .v-tab--active {
		font-weight: 700;
		color: #000;
	}

	@media (max-width: 576px) {
	}
</style>
