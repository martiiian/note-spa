import * as modules from './modules'

export interface RootState {}

export default {
  state: <RootState>{},
  modules: { ...modules }
}
