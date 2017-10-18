<template>
  <div>
    <el-popover ref="popover4" placement="bottom-start" width="400" trigger="click" title="组织机构选择" >
      <el-tree :data="orgData" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
    </el-popover>

    <div v-if="status==1">
      <div class="head">
        <el-form :inline="true">
          <el-form-item label="组织机构">
            <el-input>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-popover:popover4 >选择组织机构</el-button>
          </el-form-item>
        </el-form>

      </div>
      <el-table :data="list" style="width: 100%">

        <el-table-column type="index" label="序号" width="80">
        </el-table-column>

        <el-table-column prop="DeviceID" label="设备编码" min-width="120px">
        </el-table-column>
        <el-table-column prop="Name" label="国标名称">
        </el-table-column>
        <el-table-column prop="Manufacturer" label="厂商">
        </el-table-column>
        <el-table-column prop="IPAddress" label="设备IP">
        </el-table-column>
        <el-table-column prop="Port" label="端口地址">
        </el-table-column>

        <el-table-column prop="status" center="center" label="状态" :filters="StatusFilters" :formatter="formatStatus" :filter-method="filterStatus">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
 
            <el-button-group>
              <el-tooltip content="同步设备" placement="top">
                <el-button size="small" icon="cw-shuaxin"  @click="handleSync(scope.$index, scope.row)"></el-button>
              </el-tooltip>
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
    <MyEditor v-if="status==2" @success="onSuccess" :data="currentData" :title="title" :btnName='btnName'></MyEditor>

  </div>
</template>

<script>
import { GetGbDevices, SyncGBDevice } from '@/api/gbplatform'

import MyEditor from './edit'
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      headers: { 'x-requested-with': '222' },
      list: null,
      page_size: 1,
      total: 0,
      page_num: 0,
      listLoading: true,
      show: false,
      showOrg: false,
      status: 1,
      currentData: {
        vendor_id: '',
        transmode_id: '',
        conn_proto: '',
        stream_type: '',
        dev_type: ''
      },
      orgData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title: '新建设备',
      dialogVisible: false,
      StatusFilters: [{ text: '离线', value: 'OFF' }, { text: '在线', value: 'ON' }, { text: '其他', value: '' }]
    }
  },
  created() {
    console.log('gbdevice created')
    this.fetchData(1, 10)
  },
  mounted() {
    console.log('gbdevice mounted')
  },
  methods: {
    fetchData(page, page_size) {
      this.listLoading = true
      GetGbDevices({ page, page_size }).then(response => {
        this.list = response.data.data
        this.page_num = response.data.current_page
        this.page_size = 10
        this.total = response.data.total_records
        this.listLoading = false
      })
    },
    syncGBDevice(plat_id, dev_id) {
      this.listLoading = true
      SyncGBDevice(plat_id, dev_id).then(response => {
        this.$message({
          type: 'info',
          message: '同步成功',
          duration: 1000
        })
        this.listLoading = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '同步失败',
          duration: 1000
        })
        this.listLoading = false
      })
    },
    handleSync(index, row) {
      this.syncGBDevice(row.PlateID, row.DeviceID)
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

      this.fetchData(val, 10)
    },
    filterStatus(value, row) {
      return (row.Status === value)
      // console.log(value, row)
    },

    formatStatus(row, column, cellValue) {
      console.log(cellValue)
      // 离线 0 在线 1 未启动 2
      if (row.Status === 'OFF') {
        return '离线'
      } else if (row.Status === 'ON') {
        return '在线'
      } else {
        return '其他'
      }
    },
    handleEdit(index, row) {
      // 深度拷贝row对象，否则在子组件中会修改到row的内容.
      this.currentData = Object.assign({}, row)
      this.status = 2
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
          this.fetchData()
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
      if (refresh === true) {
        this.fetchData()
      }

      console.log('onSuccess!')
      this.status = 1
    },
    handleNodeClick(data) {
      console.log(data)
    },
    onNew() {
      this.status = 2
      this.currentData = {
        vendor_id: '',
        transmode_id: '',
        conn_proto: '',
        stream_type: '',
        dev_type: ''
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
.head {
  width: 500px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.el-form-item {
  margin-bottom: 5px;
}

.footer {
  border: #E5E9F2 solid;
  border-width: 0px 0px 1px 1px;
  height: 50px;
  margin-top: 10px;
  padding-right: 90px;
  text-align: right;
}

.el-card__header {
  padding: 1px 2px
}

.tree {
  height: 1000px;
}

.block {
  margin-top: 10px;

  float: right;
}
</style>
