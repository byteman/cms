<template>
 <el-form ref="form" :model="form" label-width="100px" v-loading.lock="listLoading" element-loading-text="正在加载参数">
  <el-card class="box-card" v-for="(section,index) in sections" :key="index">
    <div slot="header" class="clearfix">
      <span style="line-height: 24px;">{{section.Name}}</span>
    </div>
      <el-col :span="span" v-for="s in 2" :key="s" >
        <el-form-item v-for="(item,idx) in section.Items" :key="idx" :label="item.Display" label-width="200px" v-if="(idx % column) === (s-1)" >
          <el-input v-if="item.Type==='text'" v-model="item.Value" :disabled="item.ReadOnly" ></el-input>
          <el-checkbox v-if="item.Type==='checkbox'" v-model="item.Value">{{item.Display}}</el-checkbox>
          <el-select v-if="item.Type==='select'" v-model="item.Value" placeholder="请选择" style="width:100%">
            <el-option
              v-for="it in item.Data"
              :key="it.Value"
              :label="it.Text"
              :value="it.Value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

    <!-- <div v-for="(item,idx) in section.Items" :key="idx" class="text item">
      {{'列表内容 ' + item.Name }}
    </div> -->

  </el-card>
  <div class="oper">
    <el-button type="primary" @click="onSubmit" icon="cw-baocun">保存</el-button>
    <el-button icon="cw-fanhui" @click="onCancel">取消</el-button>
  </div>
 </el-form>
</template>

<script>
import { GetParams, SaveParams } from '@/api/param'
export default {
  props: ['data', 'url'],
  data() {
    return {
      sections: [],
      err: '',
      column: 2,
      span: 12,
      name: 'jerry',
      form: {},
      listLoading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    fetchData(url) {
      this.listLoading = true
      console.log("fetchData.......")
      GetParams(url).then(response => {
        // console.log(response.data)
        this.sections = response.data.config.Sections
        this.listLoading = false
      })
    },
    onCancel() {
      this.$router.push('/service/index')
    },
    onSubmit() {
      console.log('onSubmit.......')
    }

  },
  created() {
    console.log("created")
    console.log(this.$route.params.id)
    this.fetchData(this.$route.params.id)
  },
  ready: function() {
    console.log('deviceid: ' + this.$route.params.id);

  }

}
</script>

<style>
.oper{
  margin-top:10px;
  float:right;
  margin-bottom:50px;

}

</style>
