<template>
  <div class="app-body">
    <Navbar></Navbar>
    <div class="application">
      <register v-if="active == 0" @next="next"/>
      <submission v-if="active == 1" @next="next"/>
      <finish v-if="active == 2"/>
    </div>
  </div>
</template>
<script>
//处方申请
import { Navbar } from "@/views/layout/components";
import { _queryRegisterListForPatient } from "@/api/patient";
import moment from "moment";

import register from "./register";
import submission from "./submission";
import finish from "./finish";

export default {
  components: {
    Navbar,
    register,
    submission,
    finish
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next(step) {
      this.active = step;
    }
  }
};
</script>

<style lang="scss">
$padding: 24px;
.app-body {
  .application {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50px;
    padding: $padding;
    border: 1px solid white;
  }
}
</style>

