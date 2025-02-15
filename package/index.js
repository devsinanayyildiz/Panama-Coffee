import { AppRegistry } from 'react-native';
import App from './App';  // Burada doğru App dosyasını import ettiğinizden emin olun
import { name as appName } from './app.json';  // app.json'dan alınan proje adı

AppRegistry.registerComponent(appName, () => App);
