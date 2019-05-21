import * as app from 'tns-core-modules/application'
import * as platform from 'tns-core-modules/platform'
import * as color from 'tns-core-modules/color'
  export default {
    props: ['character'],
    data() {
      return {
        name: ''
      }
    },
    async created (){
      let ts=Math.floor((new Date()).getTime()/1000)
    
    },
    methods: {
      loaded (){
          if(app.android && platform.device.sdkVersion>='21'){
            var window= app.android.foregroundActivity.getWindow();
            window.setStatusBarColor(new color.Color('#8B0000').android)
            window.setNavigationBarColor(new color.Color('#8B0000').android)
          }
      },
      goBack (){
        this.$navigateBack()
      }
    }
  }
