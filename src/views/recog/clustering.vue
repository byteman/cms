<template>
  <div class="container">
    <div class="content">
      <el-table :data="param.list" v-loading="param.loading" element-loading-text="加载中,请等待">
        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="recog_id" label="注册ID" width="100">
        </el-table-column>

        <el-table-column prop="appear_freqs" label="频次" width="100">
        </el-table-column>

        <el-table-column prop="recog_img" label="注册照" width="100">
          <template slot-scope="scope">
            <img class="avatar-regist" :src="scope.row.recog_img" />
          </template>
        </el-table-column>

        <el-table-column prop="liveArray" label="抓拍照" >
          <template slot-scope="scope">
            <ul class="recog-ul" >
              <li class="recog-li" v-for="value in scope.row.liveArray">                
                <img class="avatar-recog" v-bind:src="value"/>
              </li>
            </ul>
          </template>
        </el-table-column>
          
        <el-table-column label="操作" width="100">
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
        list: [],
        loading: true
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
      this.param.loading = true;
      Page(this.param.currrent, this.param.size).then(resp => {
        var result = resp.data.data.results;
        var resultObj = eval("(" + result + ")");
        this.param.total = resultObj.total;
        this.param.list = [];
        for (var i = 0; i < resultObj.recogArray.length; i++) {
          var item = new Object();
          item.recog_id = resultObj.recogArray[i].recog_id;
          item.appear_freqs = resultObj.recogArray[i].appear_freqs;
          item.recog_img =
            "data:image/jpeg;base64," + resultObj.recogArray[i].recog_img;
          item.liveArray = [];
          for (var j = 0; j < resultObj.recogArray[i].liveArray.length; j++) {
            item.liveArray.push(
              "data:image/jpeg;base64," +
                resultObj.recogArray[i].liveArray[j].live_face_data
            );
          }
          this.param.list.push(item);
        }
         this.param.loading = false;
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
.recog-ul {
  list-style: none;
}
.recog-li {
  float: left;
}
.avatar-recog {
  width: 40%;
}
.avatar-regist {
  width: 100%;
}
</style>
