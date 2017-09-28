<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{title}}</span>
    </div>
    <div>
    <el-form  :model="form.form_data" :rules="rules" ref="devform" label-width="100px" class="clearfix">
      <el-col :span="11">
        <el-form-item label="平台名称" prop="Name">
          <el-input v-model="mydata.Name"></el-input>
        </el-form-item>
        <el-form-item label="注册设备" prop="RegDevType">
            <el-select v-model="mydata.RegDevType" placeholder="请选择" style="width:100%">
              <el-option v-for="item in form.reg_dev_options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="用户名" prop="User">
          <el-input v-model="mydata.User"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pwd">
          <el-input v-model="mydata.Pwd"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="11" :offset="1">
        <el-form-item label="国标编码" prop="ID">
          <el-input v-model="mydata.ID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="级联类型" prop="Cascade">
          <el-select v-model="mydata.Cascade" placeholder="请选择" style="width:100%">
            <el-option v-for="item in form.cascade_options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="域名" prop="Domain">
           <el-input v-model="mydata.Domain" ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="IP">
          <el-input v-model="mydata.IP" ></el-input>
        </el-form-item>
        <el-form-item label="关联VTDU" prop="RefVTDU">
          <el-input v-model="mydata.RefVTDU" ></el-input>
        </el-form-item>

      </el-col>

    </el-form>
    </div>
    <div class="footer">
        <el-button type="primary" @click="onSubmit">{{btnName}}</el-button>
        <el-button @click="onCancel">取消</el-button>
    </div>
  </el-card>
</template>

<script>
import { GetDictsByCode } from '@/api/dict'
import { AddGBPlatform } from '@/api/gbplatform'

export default {

  props: ['data', 'title', 'btnName', 'type'],

  data() {
    return {
      mydata: this.data,
      form: {
        cascade_options: [{ name: '下级平台', value: 1 }, { name: '上级平台', value: 2 }, { name: '本平台', value: 0 }, { name: '其他设备', value: 3 }],
        reg_dev_options: [{ name: '平台', value: 0 }, { name: '设备', value: 1 }, { name: '终端', value: 2 }],
        form_data: this.data
      },
      rules: {
        name: [
          { required: true, message: '请选择注册设备', trigger: 'blur' }
        ],
        ip_addr: [
          { required: true, message: '请选择级联类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    onSubmit() {
      console.log('mydata', this.mydata)
      this.$refs.devform.validate((valid) => {
        if (valid) {
          AddGBPlatform(this.mydata).then(response => {
            if (response.data.success === false) {
              this.$message({
                type: 'error',
                showClose: true,
                message: response.data.message
              })
              return
            }
            this.$emit('success', true)
            console.log(response.data)
          })
        } else {
          console.log('error submit!!')
        }
      })
    },
    resetForm(formName) {
      this.$refs.devform.resetFields()
    },
    getDicts() {
      // 厂商类型
      GetDictsByCode('RegDevType').then(response => {
        this.form.reg_dev_options = response.data
        console.log(response.data)
      })
      // 传输方式
      GetDictsByCode('Cascade').then(response => {
        this.form.cascade_options = response.data
        console.log(response.data)
      })
    },
    onCancel() {
      console.log('onCancel')
      this.$emit('success', false)
    }

  },
  mounted() {
    console.log('mounted', this.$el)
    // this.getDicts()
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
.footer{
   margin-bottom: 13px;
}
.clearfix:after {
  clear: both
}

.button {
  padding: 0;
  float: right;
}

.box-card {
  width: 800px;
  margin: 30px auto;
  height: 500px;
}
</style>
