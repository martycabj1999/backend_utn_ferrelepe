import schedule from 'node-schedule'
import {
   getUnconvertedBattlesService
} from '../modules/battle/services/BattleService'
import axios from "axios"
import {
   URL_BACKEND
} from '../../config/index'


export const convertToMp4Schedule = () => {
   schedule.scheduleJob('*/5 * * * *', async () => {
      const battles = await getUnconvertedBattlesService()
      if (battles.length > 0) {
         battles.map(battle => {
            console.log('battle convert', battle.dataValues)
            axios.post(
               `${URL_BACKEND}/api/battle/convert`, {
                  battle_id: battle.dataValues.id,
                  url_m3u8: battle.dataValues.url_m3u8
               }
            ).then(res => {
               console.log(res.data);
            })
         }, error => {
            console.log(error);
         })
      } else {
         return battles
      }
   });
}