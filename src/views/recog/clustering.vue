<template>
  <div class="container">
    <div class="head">
      <el-button class="topbutton" type="primary" @click="toExport" >导出</el-button>
    </div>
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

        <el-table-column prop="liveArray" label="抓拍照" align="center">
          <template slot-scope="scope">
            <ul class="recog-ul" >
              <li class="recog-li" v-for="value in scope.row.liveArray">                
                <img class="avatar-recog" v-bind:src="value.src"/>
              </li>
            </ul>
          </template>
        </el-table-column>
          
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toHidden(scope.row)">屏蔽</el-button>
            <el-button type="text" size="small" @click="toCancel(scope.row)">还原</el-button>
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
import { Page, Export, HiddenOrCancel } from "@/api/clustering";

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
      this.param.size = val;
      this.getResult();
    },
    handleCurrentChange(val) {
      this.param.currrent = val;
      this.getResult();
    },
    toExport() {
      Export().then(resp => {
        if (resp.data.status + "" === "0") {
          alert("导出至后台成功");
        } else {
          alert("导出至后台失败");
        }
      });
    },
    toHidden(row) {
      var list = new Array();
      console.log(row.liveArray);
      for (var i = 0; i < row.liveArray.length; i++) {
        list[i] = row.liveArray[i].id;
      }
      HiddenOrCancel(row.liveArray.length, list, 0).then(resp => {
        if (resp.status + "" === "200") {
          this.getResult();
          // alert("屏蔽成功");
        } else {
          // alert("屏蔽失败");
        }
      });
    },
    toCancel(row) {
      var list = new Array();
      for (var i = 0; i < row.liveArray.length; i++) {
        list[i] = row.liveArray[i].id;
      }
      HiddenOrCancel(row.liveArray.length, list, 1).then(resp => {
        if (resp.status + "" === "200") {
          this.getResult();
          // alert("取消屏蔽成功");
        } else {
          // alert("取消屏蔽失败");
        }
      });
    },
    getResult() {
      this.param.loading = true;
      Page(this.param.currrent, this.param.size).then(resp => {
        var result = resp.data.data.results;
        var resultObj = eval("(" + result + ")");
        this.param.total = resultObj.total;
        this.param.list = [];
        console.log(resultObj.recogArray);
        for (var i = 0; i < resultObj.recogArray.length; i++) {
          var item = new Object();
          item.recog_id = resultObj.recogArray[i].recog_id;
          item.appear_freqs = resultObj.recogArray[i].appear_freqs;
          item.recog_img =
            "data:image/jpeg;base64," + resultObj.recogArray[i].recog_img;
          item.liveArray = [];
          for (var j = 0; j < resultObj.recogArray[i].liveArray.length; j++) {
            var subItem = new Object();
            subItem.src =
              "data:image/jpeg;base64," +
              resultObj.recogArray[i].liveArray[j].live_face_data;
            subItem.id = resultObj.recogArray[i].liveArray[j].live_face_live_id;
            item.liveArray.push(subItem);
          }
          this.param.list.push(item);
        }
        console.log(this.param.list);
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
.header {
  padding: 24px;
  background-color: rgb(248, 249, 248);
  height: 90px;
}
.content {
  width: 97%;
  margin: 0 auto;
  margin-top: 20px;
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
.topbutton {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
