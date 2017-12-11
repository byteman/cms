<template>
  <div>

    <div v-if="status==1">
      <!-- <el-popover ref="popover4" placement="bottom-start" width="400" trigger="click" title="组织机构选择">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-popover> -->
      <div class="head">
        <el-form :inline="true">
              <el-form-item label="组织机构">
                <el-popover  ref="popover4" placement="bottom-start" width="400" trigger="click" title="组织机构选择">
                      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-popover>
                <el-input placeholder="请选择" v-model="orgName" ref="org" icon="caret-bottom" readonly v-popover:popover4>
                  
                </el-input>
            </el-form-item>
        </el-form>

      </div>
      
      <el-table :data="list" style="width: 100%">

        <el-table-column prop="gbcode" label="设备编码" min-width="120px">
        </el-table-column>
        <el-table-column prop="name" label="设备名称">
        </el-table-column>
        <el-table-column prop="dev_type" label="设备类型">
        </el-table-column>
        <el-table-column prop="ip_addr" label="设备IP">
        </el-table-column>
        <el-table-column prop="port" label="端口地址">
        </el-table-column>
        <el-table-column prop="rtsp_url" label="RTSP地址" min-width="250px">
        </el-table-column>
        <el-table-column prop="vendor_id" label="厂商" :formatter="formatVendor">
        </el-table-column>
        <el-table-column prop="status" label="状态" :filters="StatusFilters" :formatter="formatStatus" :filter-method="filterStatus">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>

              <el-button size="small" icon="cw-bofang1"></el-button>

              <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>

              <el-button size="small" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>

            </el-button-group>
          </template>
        </el-table-column>

      </el-table>
      <div class="footer">
        <div class="block">
          <el-pagination layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <MyEditor v-if="status==2" @success="onSuccess" :data="currentData" :title="title" :btnName='btnName' ></MyEditor>

    <div class="footer">
      <el-button type="primary" icon="edit" @click="onNew" v-if="status==1">新建</el-button>
    </div>

  </div>
</template>

<script>
import { getDevices, GetDeviceTrees } from '@/api/device'
import { RemoveDevice } from '@/api/device'
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
      page_size: 25,
      total: 0,
      levelCode: '',
      orgId: '',
      page_index: 1,
      show: false,
      orgName: '',
      status: 1,
      treeData: [],
      defaultProps: {
        children: 'nodes',
        label: 'text'
      },
      currentData: {
        vendor_id: '',
        transmode_id: '',
        conn_proto: '',
        stream_type: '',
        dev_type: ''
      },
      title: '新建设备',
      dialogVisible: false,
      StatusFilters: [{ text: '离线', value: 0 }, { text: '在线', value: 1 }, { text: '未启动', value: 2 }]
    }
  },
  created() {
    console.log("index mounted")
    this.fetchDevTree()
    this.fetchData(1, 25, this.levelCode)
  },
  methods: {
    fetchData(page_index, page_size, org) {
      this.listLoading = true
      
      getDevices(page_index, page_size, org).then(response => {
        this.list = response.data.data
        this.page_num = response.data.current_page
        this.page_size = 10
        this.total = response.data.total_records
        this.listLoading = false
      })
    },
    fetchDevTree() {
      GetDeviceTrees().then(response => {
        console.log(response.data)
        this.treeData = response.data
      })
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.fetchData(val, this.page_size, this.levelCode)
    },
    filterStatus(value, row) {
      return (row.status === value)
      // console.log(value, row)
    },
    formatVendor(row, column, cellValue) {
      // console.log(row, column, cellValue)
      if (cellValue === 'hik') {
        return '海康'
      } else if (cellValue === 'dahua') {
        return '大华'
      }
    },
    formatStatus(row, column, cellValue) {
      // console.log(row, column, cellValue)
      // 离线 0 在线 1 未启动 2
      if (cellValue === 'OFF') {
        return '离线'
      } else if (cellValue === 'ON') {
        return '在线'
      } 
    },
    handleEdit(index, row) {
      // 深度拷贝row对象，否则在子组件中会修改到row的内容.
      this.currentData = Object.assign({}, row)
      this.status = 2
      //this.orgId = this.currentData.orgId
      this.title = '编辑设备'
      this.btnName = '立即修改'
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        RemoveDevice(row).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData(this.page_index, this.page_num, this.levelCode)
          console.log(response.data)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

      console.log(index, row)
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
      console.log("levelcode == ", this.levelCode)
      if (refresh === true) {
        this.fetchData(this.page_index, this.page_size, this.levelCode)
      }

      console.log('onSuccess!')
      this.status = 1
    },
    handleNodeClick(data) {
      console.log('nodeclick--->', data.levelCode)
      this.orgName = data.text
      this.levelCode = data.levelCode
      console.log("levelcode == ", this.levelCode)
      this.fetchData(this.page_index, this.page_size, data.levelCode)
    },
    onNew() {
      this.status = 2
      this.currentData = {
        vendor_id: '',
        transmode_id: '',
        conn_proto: '',
        stream_type: '',
        dev_type: '',
        ref_vtdu: ''
      }
      this.title = '新建设备'
      this.btnName = '立即创建'
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

<style scoped>
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}

.el-card__header {
  padding: 1px 2px
}
.el-form-item{
  margin-top: 10px;
  margin-bottom: 10px;
}
.tree {
  height: 1000px;
}
.head {
  width: 500px;
  vertical-align:middle;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>
