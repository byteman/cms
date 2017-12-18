<template>
  <div class="container">
    <div class="content">
    <el-table :data="param.list">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="recog_id" label="注册ID">
      </el-table-column>

      <el-table-column prop="appear_freqs" label="频次">
      </el-table-column>

      <el-table-column prop="recog_img" label="注册照">
         <template slot-scope="scope">
          <img class="avatar" :src="scope.row.recog_img" />
        </template>
      </el-table-column>

      <el-table-column prop="liveArray" label="抓拍照">
      </el-table-column>
        
      <el-table-column label="操作" width="300" align='center'>
        <template slot-scope="scope">
          <el-button type="text" size="small" >导出</el-button>
        </template>
       </el-table-column>
    </el-table>
    </div>
      <div class="footer">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 15, 20]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="param.total">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import { Page } from "@/api/clustering";

export default {
  data() {
    return {
      param: {
        total: 0,
        currrent: 1,
        size: 10,
        list: []
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.param.size = val;
      this.getResult();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.param.currrent = val;
      this.getResult();
    },
    getResult() {
      Page(this.param.currrent, this.param.size).then(resp => {
        var result = resp.data.data.results;
        var resultObj = eval("(" + result + ")");
        this.param.total = resultObj.total;
        console.log(resultObj);
        this.param.list = [];
        for (var i = 0; i < resultObj.recogArray.length; i++) {
          var item = new Object();
          item.recog_id = resultObj.recogArray[i].recog_id;
          item.appear_freqs = resultObj.recogArray[i].appear_freqs;
          item.recog_img = resultObj.recogArray[i].recog_img;
          item.liveArray = resultObj.recogArray[i].liveArray;
          this.param.list.push(item);
        }

        console.log(this.param);
      });
    }
  },
  mounted() {
    this.getResult();
  }
};
</script>
<style scoped>
.container {
  width: 99%;
  margin: 0 auto;
  border: 1px solid #dfe6ec;
  min-height: 600px;
}
.content {
  width: 97%;
  margin: 0 auto;
}
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}
</style>
