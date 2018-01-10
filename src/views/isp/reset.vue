<template>
  <el-card class="box-card">
    <div class="cardheight">
    <el-form ref="form"  label-width="100px" class="form0">

    <el-form-item class="button">
      <el-button  type="warning" @click='onReset'>重置参数</el-button>
    </el-form-item>

  </el-form>
  </div>
  </el-card>
</template>

<script>

import { GetISP, SetISP } from '@/api/isp'

export default {

  data() {
    return {
      form: {
        isp_type:0,
      },
    }
  },
  methods: {   
    onReset() {
      this.setISP()
    },
    setISP() {
      console.log('onReset')
      SetISP({'isp_type': 0}).then(response => {
        console.log(response);
        if (response.data.status == 0) {
        this.$message('重置成功')
        } else {
          alert("重置失败，错误信息：" + response.data.status);
        }      
      })
    }
  },
  mounted() {
    console.log('edit mounted')
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.bottom {
  margin-bottom: 13px;
  line-height: 12px;
}

.clearfix:after {
  clear: both
}

.button {
  margin-left: 190px
}

.box-card {
  width: 90%;
  margin: 30px auto;
  /* height: 700px; */
}

.cardheight {
  height: auto;
}
.form0{
  margin-right: 10px
}

</style>
