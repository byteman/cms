<template>
  <div>
    <el-form :inline="true" :model="param" :rules="rules" class="demo-form-inline">
      <el-form-item label="抓拍时间">
        <div class="block">
          <el-date-picker
            v-model="param.datetime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="抓拍ID">
        <el-input v-model="param.live_id" ></el-input>
      </el-form-item>

      <el-form-item label="通道ID">
        <el-input v-model="param.channel_id" ></el-input>
      </el-form-item>

      <el-form-item label="对比分过滤" prop="top1_scoreMin">
        <el-input  v-model="param.top1_scoreMin" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button  @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button  @click="onRest">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="param.list">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="live_id" label="抓拍ID">
      </el-table-column>

      <el-table-column prop="channel_id" label="通道ID">
      </el-table-column>

      <el-table-column prop="liveFaceData" label="抓拍图">
         <template slot-scope="scope">
          <img class="avatar" :src="scope.row.liveFaceData" />
        </template>
      </el-table-column>

      <el-table-column prop="timeStamp" label="抓拍时间">
      </el-table-column>

      <el-table-column prop="similar_live_id" label="相似ID">
      </el-table-column>

      <el-table-column prop="top1Score" label="TOP1对比分">
      </el-table-column>

      <el-table-column prop="top1" label="TOP1">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top1" />
        </template>
      </el-table-column>

      <el-table-column prop="top2" label="TOP2">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top2" />
        </template>
      </el-table-column>

      <el-table-column prop="top3" label="TOP3">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top3" />
        </template>
      </el-table-column>

      <el-table-column prop="top4" label="TOP4">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top4" />
        </template>
      </el-table-column>

      <el-table-column prop="top5" label="TOP5">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top5" />
        </template>
      </el-table-column>

        
      <el-table-column label="操作" width="300" align='center'>
        <template slot-scope="scope">
          <el-button type="text" size="small" >详情</el-button>
        </template>
       </el-table-column>

    </el-table>

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
</template>

<script>
import { Page } from "@/api/recogrecod";

export default {
  data() {
    var threshold_validator = (rule, value, callback) => {
      if (value < 0 || value > 1) {
        callback(new Error("该值必须在0-1之间的数字"));
      } else {
        callback();
      }
    };

    return {
      param: {
        total: 100,
        currrent: 1,
        size: 10,
        datetime: [],
        live_id: "",
        channel_id: "",
        top1_scoreMin: "",
        list: []
      },
      rules: {
        top1_scoreMin: [{ validator: threshold_validator, trigger: "blur" }]
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
    onSubmit() {
      this.param.currrent = 1;
      this.getResult();
    },
    onRest() {
      this.param = {
        total: 0,
        currrent: 1,
        size: 10,
        datetime: [],
        live_id: "",
        channel_id: "",
        top1_scoreMin: "",
        list: []
      };
      this.getResult();
    },
    getResult() {
      if (this.param.datetime[0]) {
        var start = this.param.datetime[0].getTime();
      }
      if (this.param.datetime[1]) {
        var end = this.param.datetime[1].getTime();
      }
      Page(
        this.param.currrent,
        this.param.size,
        this.param.channel_id,
        this.param.live_id,
        this.param.top1_scoreMin,
        start,
        end
      ).then(resp => {
        console.log(resp);
        var result = resp.data.data.results;
        var resultObj = eval("(" + result + ")");
        this.param.total = resultObj.total;
        console.log(this.param.total);
        console.log(resultObj.liveArray);
        this.param.list = [];
        for (var i = 0; i < resultObj.liveArray.length; i++) {
          var item = new Object();
          item.live_id = resultObj.liveArray[i].live_id;
          item.channel_id = resultObj.liveArray[i].channel_id;
          var timestamp = resultObj.liveArray[i].timeStamp;
          var newDate = new Date();
          newDate.setTime(timestamp * 1000);
          item.timeStamp = newDate.toJSON();
          item.liveFaceData =
            "data:image/jpeg;base64," + resultObj.liveArray[i].liveFaceData;
          item.similar_live_id = resultObj.liveArray[i].similar_live_id;
          item.top1Score = resultObj.liveArray[i].recogArray[0].topScore;
          item.top1 =
            "data:image/jpeg;base64," +
            resultObj.liveArray[i].recogArray[0].regFaceData;

          if (resultObj.liveArray[i].recogArray[1]) {
            item.top2 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[1].regFaceData;
          }
          if (resultObj.liveArray[i].recogArray[2]) {
            item.top3 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[2].regFaceData;
          }
          if (resultObj.liveArray[i].recogArray[3]) {
            item.top4 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[3].regFaceData;
          }
          if (resultObj.liveArray[i].recogArray[4]) {
            item.top5 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[4].regFaceData;
          }
          this.param.list.push(item);
        }
      });
    }
  },
  mounted() {
    this.getResult();
  }
};
</script>