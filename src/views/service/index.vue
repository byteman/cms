<template>
  <div>

    <el-table v-if="status==1" :data="list" style="width: 100%">

      <el-table-column prop="ID" label="服务编码" width="200">
      </el-table-column>
      <el-table-column prop="Name" label="服务名称" width="180">
      </el-table-column>
      <el-table-column prop="HostAddress" label="主机地址">
      </el-table-column>
      <el-table-column prop="PortListener" label="监听端口">
      </el-table-column>
      <el-table-column prop="LoginName" label="登录名">
      </el-table-column>
      <el-table-column prop="Status" label="状态" :filters="StatusFilters" :formatter="formatStatus" :filter-method="filterStatus">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button-group>
            <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button size="small" icon="upload" @click="onUpdate(scope.$index, scope.row)"></el-button>
            <el-button size="small" icon="setting" @click="HandleSetting(scope.$index, scope.row)"></el-button>
            <el-button size="small" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
          </el-button-group>

          </el-upload>
        </template>
      </el-table-column>

    </el-table>

    <MyEditor v-if="status==2" @success="onSuccess" :data="currentData" :title="title" :btnName='btnName'></MyEditor>
    <el-dialog title="服务部署" :visible.sync="dialogVisible" size="tiny">
      <el-upload class="upload-demo" ref="upload" :action="action" :data="params" :headers="headers" :on-error="handleError" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传tar.gz文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="footer">
      <el-button type="primary" icon="edit" @click="onNew" v-if="status==1">新建</el-button>
    </div>
  </div>
</template>

<script>
import { getServices } from '@/api/service'
import { RemoveService, StopService } from '@/api/service'
import MyEditor from './edit'
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      headers: { 'x-requested-with': '222' },
      list: null,
      listLoading: true,
      fileList: [],
      show: false,
      status: 1,
      params: {'a':1 },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      currentData: null,
      title: '新建服务',
      filename: '',
      dialogVisible: false,
      action: 'http://192.168.40.9:8999/upload',
      StatusFilters: [{ text: '未上线', value: 0 }, { text: '在线', value: 1 }, { text: '禁用', value: 2 }, { text: '服务异常', value: 3 }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true

      getServices(this.org).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    filterStatus(value, row) {
      return (row.Status === value)
      // console.log(value, row)
    },
    formatStatus(row, column, cellValue) {
      // console.log(row, column, cellValue)
      if (cellValue === 0) {
        return '未上线'
      } else if (cellValue === 1) {
        return '在线'
      } else if (cellValue === 2) {
        return '禁用'
      } else if (cellValue === 3) {
        return '服务异常'
      }
    },
    handleEdit(index, row) {
      // 深度拷贝row对象，否则在子组件中会修改到row的内容.
      this.currentData = Object.assign({}, row)
      this.status = 2
      this.title = '编辑服务'
      this.btnName = '立即修改'
      console.log(index, row)
    },
    HandleSetting(index, row) {
      // 出现自动配置参数框,根据自定义参数选项，动态生成表单.
      console.log(index, row)
      var url = 'subj_' + row.Name + '_' + row.ID
      this.$router.push('/service/param/' + url)
    },
    handleError(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message({
        type: 'error',
        message: '上传失败!'
      })
    },
    removeService()
    {
      
      RemoveService(row.ID).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
          console.log(response.data)
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    stopService(row)
    {
      var url = 'http://' + row.HostAddress + ':' + row.PortListener + '/api/programs/'+ row.Name + '/stop'   

      StopService(url).then(response => {
          RemoveService(row)
          console.log(response.data)
        }).catch(() => {
          this.$message({
          type: 'error',
          message: '停止服务失败'
        })
        console.log('cancel')
      })
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.stopService(row)
        console.log(index, row)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    onSubmit() {
      console.log('submit!')
      this.status = 1
    },
    onSuccess(refresh) {
      if (refresh === true) {
        this.fetchData();
      }

      console.log('onSuccess!')
      this.status = 1
    },
    onNew() {
      this.status = 2
      this.currentData = {}
      this.title = "新建服务";
      this.btnName = '立即创建'
    },
    /*
* 用来遍历指定对象所有的属性名称和值
* obj 需要遍历的对象
* author: Jet Mah
* website: http://www.javatang.com/archives/2006/09/13/442864.html 
*/ 
  allPrpos(obj) { 
    // 用来保存所有的属性名称和值
    var props = "";
    // 开始遍历
    for(var p in obj){ 
        // 方法
        if(typeof(obj[p])=="function"){ 
            obj[p]();
        }else{ 
            // p 为属性名称，obj[p]为对应属性的值
            props+= "&" + p + "=" + obj[p] ;
        } 
    } 
    // 最后显示所有的属性
    return props
},
    onUpdate(index, row) {
      
      console.log(index, row.HostAddress, row.PortListener, row.Name);
      console.log(this.allPrpos(row))
      this.action = 'http://' + row.HostAddress + ':' + row.PortListener + '/upload?name=' + row.Name + this.allPrpos(row)
     
      console.log("onUpldate action=", this.action)
      this.dialogVisible = true
      console.log(this.$refs.upload)
      if (this.$refs.upload !== undefined)
        this.$refs.upload.clearFiles()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style>
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}
</style>
