<template>
   <div class="content">
  <el-button type="primary" @click="OnSave1" >清空识别记录</el-button>
  <el-button type="primary" @click="OnSave2" >重新加载</el-button>
  <el-button  type="primary" @click="OnSave3" >加载特征优化</el-button>
  <el-button type="primary" @click="OnSave4" >增量建模</el-button>
  <el-button type="primary"  @click="OnSave5" >本地序列化</el-button>
  <el-button type="primary" @click="OnSave6" >充值正负值</el-button>
  <el-button type="primary" @click="OnSave7" >新建特征模型</el-button>
  <el-button type="primary" @click="OnSave8" >重启系统</el-button>
</div>
</template>

<script>
import {
  ClearRecogRecod,
  Reload,
  FeatureOptimization,
  UpliftModeling,
  LocalSerialization,
  RestPositiveNegativeValues,
  NewFeatureModeling,
  Restart
} from "@/api/envsystemsettings";

export default {
  data() {
    return {};
  },
  methods: {
    OnSave1() {
      ClearRecogRecod().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    OnSave2() {
      Reload().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    OnSave3() {
      FeatureOptimization().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    OnSave4() {
      UpliftModeling().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    OnSave5() {
      LocalSerialization().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    OnSave6() {
      RestPositiveNegativeValues().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    OnSave7() {
      NewFeatureModeling().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    OnSave8() {
      Restart().then(resp => {
        console.log(resp);
        if (resp.data.status == 0) {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    }
  }
};
</script>
<style scoped>

.content {
  width: 97%;
  margin: 0 auto;
  margin-top: 50px;
  margin-left: 50px;
}
</style>

