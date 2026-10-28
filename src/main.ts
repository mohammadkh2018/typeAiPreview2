
// // main.ts - خیلی اول

// const keysToBlock = [
//   'tabde_',
//   'de_element',
//   'editorReview_Tab',
//   '_editor_',
//   'type_ai_editor',
//   'preview_type_ai',
//   'pdfjs.',
//   'tabmy_'
// ];

// // ✅ Native methods رو bind کن (نه call/apply)
// const nativeSetItem = localStorage.setItem.bind(localStorage);
// const nativeGetItem = localStorage.getItem.bind(localStorage);
// const nativeRemoveItem = localStorage.removeItem.bind(localStorage);
// const nativeClear = localStorage.clear.bind(localStorage);
// const nativeKey = localStorage.key.bind(localStorage);

// // ✅ Helper: کلید مسدود هست؟
// const isBlockedKey = (key: string): boolean => {
//   return keysToBlock.some(prefix => key.startsWith(prefix) || key.includes(prefix));
// };

// // ✅ Proxy برای localStorage
// const storageProxy = new Proxy(localStorage, {
//   get(target, prop: string | symbol) {
//     // setItem
//     if (prop === 'setItem') {
//       return (key: string, value: string) => {
//         if (isBlockedKey(key)) {
//           return;
//         }
//         nativeSetItem(key, value); // ✅ bind شده است
//       };
//     }

//     // removeItem
//     if (prop === 'removeItem') {
//       return (key: string) => {
//         if (isBlockedKey(key)) {
//           return;
//         }
//         nativeRemoveItem(key); // ✅ bind شده است
//       };
//     }

//     // getItem
//     if (prop === 'getItem') {
//       return (key: string) => {
//         if (isBlockedKey(key)) {
//           return null;
//         }
//         return nativeGetItem(key); // ✅ bind شده است
//       };
//     }

//     // clear
//     if (prop === 'clear') {
//       return () => {
//         nativeClear(); // ✅ bind شده است
//       };
//     }

//     // key
//     if (prop === 'key') {
//       return (index: number) => {
//         const k = nativeKey(index); // ✅ bind شده است
//         if (k && isBlockedKey(k)) {
//           return null;
//         }
//         return k;
//       };
//     }

//     // length
//     if (prop === 'length') {
//       return localStorage.length;
//     }

//     // باقی properties
//     return (target as any)[prop];
//   }
// });

// // ✅ Replace window.localStorage
// Object.defineProperty(window, 'localStorage', {
//   value: storageProxy,
//   writable: false,
//   configurable: true
// });



// const originalWarn = console.warn;
// console.warn = (...args: any[]) => {
//   const msg = args[0]?.toString() ?? '';
//   if (
//     msg.includes('Translation for the key') ||
//     msg.includes('is undefined') ||
//     msg.includes('is missing')
//   ) {
//     return;
//   }
//   originalWarn.apply(console, args);
// };

// // ========================================================
// // Zone.js
// // ========================================================
// (window as any).__Zone_disable_storage = true;
// (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['storage'];

// import 'zone.js';

// // ========================================================
// // باقی imports
// // ========================================================
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';



// const url = new URL(window.location.href);
// (window as any).__appParam = url.searchParams.get('param') || document.querySelector('app-root')?.getAttribute('inputcomponenename')?.match(/[?&]param=([^&/]+)/)?.[1];
// (window as any).Param2 = document.querySelector('app-root')?.getAttribute('param2');
// (window as any).saveStatus = document.querySelector('app-root')?.getAttribute('saveStatus');

// console.log('saveStatus' , (window as any).saveStatus);


// //https://test.ssmorvarid.ir/Hermes_Web/automation/typeAIPreview/assets/locale/locale.properties

// const urlBlobking = window.location.origin + '/Hermes_Web/automation/typeAIPreview/assets/locale/locale.properties'



// // ========================================================
// // Bootstrap Angular
// // ========================================================
// platformBrowserDynamic().bootstrapModule(AppModule, {
//   ngZoneEventCoalescing: true,
//   ngZoneRunCoalescing: true
// })
//   .then(() => {
//     console.log('✅ برنامه با موفقیت شروع شد');
//   })
//   .catch(err => {
//     console.error('❌ خطا:', err);
//   });
















// main.ts - خیلی اول

const keysToBlock = [
  'tabde_',
  'de_element',
  'editorReview_Tab',
  '_editor_',
  'type_ai_editor',
  'preview_type_ai',
  'pdfjs.',
  'tabmy_'
];

// ✅ Native methods رو bind کن (نه call/apply)
const nativeSetItem = localStorage.setItem.bind(localStorage);
const nativeGetItem = localStorage.getItem.bind(localStorage);
const nativeRemoveItem = localStorage.removeItem.bind(localStorage);
const nativeClear = localStorage.clear.bind(localStorage);
const nativeKey = localStorage.key.bind(localStorage);

// ✅ Helper: کلید مسدود هست؟
const isBlockedKey = (key: string): boolean => {
  return keysToBlock.some(prefix => key.startsWith(prefix) || key.includes(prefix));
};

// ✅ Proxy برای localStorage
const storageProxy = new Proxy(localStorage, {
  get(target, prop: string | symbol) {
    if (prop === 'setItem') {
      return (key: string, value: string) => {
        if (isBlockedKey(key)) {
          return;
        }
        nativeSetItem(key, value);
      };
    }

    if (prop === 'removeItem') {
      return (key: string) => {
        if (isBlockedKey(key)) {
          return;
        }
        nativeRemoveItem(key);
      };
    }

    if (prop === 'getItem') {
      return (key: string) => {
        if (isBlockedKey(key)) {
          return null;
        }
        return nativeGetItem(key);
      };
    }

    if (prop === 'clear') {
      return () => {
        nativeClear();
      };
    }

    if (prop === 'key') {
      return (index: number) => {
        const k = nativeKey(index);
        if (k && isBlockedKey(k)) {
          return null;
        }
        return k;
      };
    }

    if (prop === 'length') {
      return localStorage.length;
    }

    return (target as any)[prop];
  }
});

// ✅ Replace window.localStorage
Object.defineProperty(window, 'localStorage', {
  value: storageProxy,
  writable: false,
  configurable: true
});

const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const msg = args[0]?.toString() ?? '';
  if (
    msg.includes('Translation for the key') ||
    msg.includes('is undefined') ||
    msg.includes('is missing')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};

// ========================================================
// Zone.js
// ========================================================
(window as any).__Zone_disable_storage = true;
(window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['storage'];

import 'zone.js';

// ========================================================
// باقی imports
// ========================================================
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const url = new URL(window.location.href);
(window as any).__appParam = url.searchParams.get('param') || document.querySelector('app-root')?.getAttribute('inputcomponenename')?.match(/[?&]param=([^&/]+)/)?.[1];
(window as any).Param2 = document.querySelector('app-root')?.getAttribute('param2');
(window as any).saveStatus = document.querySelector('app-root')?.getAttribute('saveStatus');

// console.log('saveStatus', (window as any).saveStatus);

//https://test.ssmorvarid.ir/Hermes_Web/automation/typeAIPreview/assets/locale/locale.properties

const urlBlobking = window.location.origin + '/Hermes_Web/automation/typeAIPreview/assets/locale/locale.properties';

// ========================================================
// جلوگیری از fetch شدن locale.properties (و فایل‌های زبان مربوطه)
// ========================================================
const originalFetch = window.fetch;
window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
  const requestUrl = typeof input === 'string'
    ? input
    : (input as Request).url ?? (input as URL).toString();

  if (requestUrl === urlBlobking || requestUrl.includes('/locale/')) {
    return Promise.resolve(new Response('', { status: 200 }));
  }

  return originalFetch.call(window, input, init);
};

const originalXhrOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method: string, requestUrl: string, ...rest: any[]) {
  if (typeof requestUrl === 'string' && (requestUrl === urlBlobking || requestUrl.includes('/locale/'))) {
    requestUrl = 'data:text/plain;base64,';
  }
  return (originalXhrOpen as any).call(this, method, requestUrl, ...rest);
};

// ========================================================
// Bootstrap Angular
// ========================================================
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
  ngZoneRunCoalescing: true
})
  .then(() => {
    // console.log('✅ برنامه با موفقیت شروع شد');
  })
  .catch(err => {
    console.error('❌ خطا:', err);
  });









