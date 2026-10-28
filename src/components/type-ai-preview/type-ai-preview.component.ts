import { AfterViewInit, ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TabService } from '../../core/Services/tab.service';
import { ContentType, TypeAiPreviewService } from '../typeAiPreview.service';
import { optionalData, PageData } from './typeAiPreview.model';
import { catchError, forkJoin, of } from 'rxjs';
import { pdfDefaultOptions, LinkTarget } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-type-ai-preview',
  templateUrl: './type-ai-preview.component.html',
  styleUrl: './type-ai-preview.component.scss',
})

export class TypeAiPreviewComponent implements OnInit, AfterViewInit, OnDestroy {

  creatorId: string = ''
  marginTop: any;
  marginLeft: any;
  selectedOlgo: any = '';
  showPreviewOptions: boolean = true;
  letterReceivers: any[] = [];
  letterCopies: any[] = [];
  data: any;
  filteredOlgoList: any[] = [];
  olgoListData: any[] = [];
  isLoadingTemplate: boolean = false;
  list: any[] = [];
  click: boolean = false;
  showPrintSettings: boolean = false;
  ShowOutputType: boolean = false;
  checkBoxesList: any[] = [];
  recipientList: any[] = [];
  transcriptList: any[] = [];
  newList: any = [];
  newOption: any[] = [];
  savedSignatures: any[] = [];
  authentication: any = sessionStorage.getItem('hash1');
  authorization: string = '';
  model: any;
  private resizeTimer: any;
  showPreview: boolean = false;
  substituteId: any;
  olgo: any;
  recipentChecked: boolean = true
  transcriptChecked: boolean = true
  param: any
  pdfSrc: string | Uint8Array | undefined = undefined;
  dblClickEvent: any;
  showsignaturesbyuser: boolean = false;
  signatureList: any[] = [];
  selectedSignatureForModal: any = null;
  signerId: any;
  private viewerResizeObserver: ResizeObserver | null = null;
  param2: string = ''
  saveStatus: any

  private dblClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  serverImageData: PageData = {
    width: 595,
    height: 842,
    leftMargin: 72,
    topMargin: 72,
    rightMargin: 72,
    bottomMargin: 72,
    leftDate: 72,
    topDate: 72,
    background: ""
  };

  showPrint: boolean = false;
  showAdvancedPrint: boolean = false;
  showEditLetter: boolean = false;
  showOutputFormat: boolean = false;

  sigTopPosition: number = 0
  sigLeftPosition: number = 0
  sigRightPosition: number = 0
  sigBottomPosition: number = 0
  sigPageNumber: number = 0

  constructor(
    private checkIsService: TypeAiPreviewService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private tabService: TabService,
    private ngZone: NgZone,
  ) {
    // const url = new URL(window.location.href);
    const Param2 = (window as any).Param2;
    this.param2 = Param2

  }

// @HostListener('document:copy', ['$event'])
// onCopy(event: ClipboardEvent) {
//   console.log('%c[COPY] 1. event fired', 'color: green; font-weight: bold');

//   const sel = window.getSelection();
//   const selection = sel?.toString() ?? '';

//   console.log('[COPY] 2. selection length:', selection.length);
//   console.log('[COPY] 3. selection raw:', selection);
//   console.log('[COPY] 4. char codes (first 20):',
//     Array.from(selection).slice(0, 20).map(c => 'U+' + c.codePointAt(0)!.toString(16).toUpperCase()));
//   console.log('[COPY] 5. anchorNode:', sel?.anchorNode);
//   console.log('[COPY] 6. inside #viewer?',
//     !!(sel?.anchorNode?.parentElement?.closest('#viewer')));
//   console.log('[COPY] 7. clipboardData exists?', !!event.clipboardData);

//   if (!selection) {
//     console.warn('[COPY] ❌ selection is EMPTY -> return (انتخاب متن کار نمی‌کند)');
//     return;
//   }

//   const fixed = this.fixPersianPresentationText(selection);
//   console.log('[COPY] 8. fixed result:', fixed);

//   if (!event.clipboardData) {
//     console.error('[COPY] ❌ clipboardData is null -> نمی‌شود ست کرد');
//     return;
//   }

//   event.clipboardData.setData('text/plain', fixed);
//   event.preventDefault();
//   console.log('[COPY] 9. ✅ setData done');
// }

// private fixPersianPresentationText(text: string): string {
//   const normalized = text.normalize('NFKC');
//   console.log('[FIX] after NFKC:', normalized);

//   const result = normalized
//     .split('\n')
//     .map(line => this.reverseKeepingLtr(line))
//     .join('\n');
//   console.log('[FIX] after reverse:', result);
//   return result;
// }

// private reverseKeepingLtr(line: string): string {
//   const tokens = line.split(/(\s+)/);
//   return tokens
//     .map(tok => /[\u0600-\u06FF]/.test(tok)
//       ? Array.from(tok).reverse().join('')
//       : tok)
//     .reverse()
//     .join('');
// }

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.renderAllSignatures()
      // this.applyWatermarkToAllPages();
    }, 10);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    if (this.ShowOutputType) this.ShowOutputType = false
  }

  ngOnInit() {
    pdfDefaultOptions.externalLinkTarget = LinkTarget.BLANK
    this.clearOldStorageKeys();
    this.loadPdf()
  }

  clearOldStorageKeys() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('tabde_') || key.startsWith('de_element') || key.includes('_editor_')) {
        localStorage.removeItem(key);
      }
    });
  }

  idLetter: any

  loadPdf(): void {
    // this.showPrint = true;
    // this.showAdvancedPrint = true;
    // this.showEditLetter = true;
    // this.showOutputFormat = true;

    // this.isLoadingTemplate = true
    // setTimeout(() => {
    //   this.isLoadingTemplate = false
    // }, 1000);
    const param = (window as any).__appParam;
    this.param = param

    this.isLoadingTemplate = true;
    this.filteredOlgoList = [...this.olgoListData];

    this.checkIsService.CheckIs(param).subscribe((res: any) => {
      if (res?.outNumber < 0) {
        this.showError(res.outMessage)
        this.isLoadingTemplate = false;
        return
      }
      this.data = res;
      this.authorization = res?.accessToken;
      this.substituteId = res?.substitute2;
      this.showPreview = true;

      const list: any[] = Array.isArray(res?.olgoList) ? res.olgoList : [];
      this.list = list;
      // // this.selectedOlgo = list[0]?.title;

      // const item = list.filter((item: any) => item.templateId === res?.templateId)

      // const newItems = list
      //   .map((it: any) => {
      //     if (it && typeof it.title === 'string' && it.title.trim() !== '') {
      //       return { ...it };
      //     }
      //     return null;
      //   })
      //   .filter((i: any) => i !== null);

      // if (newItems.length > 0) {
      //   this.olgoListData = [...this.olgoListData, ...newItems];
      //   this.filteredOlgoList = [...this.olgoListData];
      // }

      forkJoin({
        pdf: this.checkIsService.parhizkarPreviewService(this.authorization), //this.authorization
        permissions: this.checkIsService.previewCheckIs(this.authorization),
        letterProps: this.checkIsService.LetterPropertiesPreview(this.authentication , this.authorization , this.substituteId) //this.authentication , this.authorization ,
      }).subscribe({
        next: ({ pdf, permissions, letterProps }: any) => {
          // PDF
          const url = URL.createObjectURL(pdf as Blob);
          this.pdfSrc = url;
          this.idLetter = permissions?.idLetter

          // this.selectedOlgo = list[0]?.title;

          const olgo = list.find((item: any) => item.idTemplate === letterProps?.templateId)
          if (olgo) {
            this.selectedOlgo = olgo?.title
          } else {
            this.selectedOlgo = '*عدم دسترسی به سربرگ*'
          }

          // Permissions
          if (permissions?.printBtn) this.showPrint = true;
          if (permissions?.advancedPrintBtn) this.showAdvancedPrint = true;
          if (permissions?.outPutFormatBtn) this.showOutputFormat = true;

          if (this.param2 !== null && this.param2 == 'editToPrev') {
            this.showEditLetter = false
          } else {
            if (permissions?.editLetterBtn) this.showEditLetter = true;
          }
          // Letter props
          this.signatures = letterProps?.signatures;
          this.marginTop = letterProps?.marginTop;
          this.marginLeft = letterProps?.marginLeft;
          this.letterReceivers = letterProps?.receivers;
          this.letterCopies = letterProps?.copies;

          if (letterProps?.pageWidth && letterProps?.pageHeight) {
            this.serverImageData = {
              ...this.serverImageData,
              width: letterProps.pageWidth,
              height: letterProps.pageHeight
            };
          }


          this.isLoadingTemplate = false;
          this.isPageCurrentlyVisible = true

        },
        error: (err) => {
          console.error('❌ error:', err);
          this.isLoadingTemplate = false;
        }
      });
    });
  }




  // loadPdf(): void {
  //   const param = (window as any).__appParam;
  //   this.param = param;

  //   this.isLoadingTemplate = true;
  //   this.filteredOlgoList = [...this.olgoListData];

  //   this.checkIsService.CheckIs(param).subscribe((res: any) => {
  //     if (res?.outNumber < 0) {
  //       this.showError(res.outMessage);
  //       this.isLoadingTemplate = false;
  //       return;
  //     }
  //     this.data = res;
  //     this.authorization = res?.accessToken;
  //     this.substituteId = res?.substitute2;
  //     this.showPreview = true;

  //     const list: any[] = Array.isArray(res?.olgoList) ? res.olgoList : [];
  //     this.list = list;
  //     this.selectedOlgo = list[0]?.title;

  //     const newItems = list
  //       .map((it: any) => {
  //         if (it && typeof it.title === 'string' && it.title.trim() !== '') {
  //           return { ...it };
  //         }
  //         return null;
  //       })
  //       .filter((i: any) => i !== null);

  //     if (newItems.length > 0) {
  //       this.olgoListData = [...this.olgoListData, ...newItems];
  //       this.filteredOlgoList = [...this.olgoListData];
  //     }

  //     forkJoin({
  //       pdf: this.checkIsService.parhizkarPreviewService(this.authorization).pipe(
  //         catchError( (err => {
  //           console.error('❌ خطا در دریافت pdf:', err?.status, err);
  //           this.showError('امکان دریافت فایل پیش‌نمایش وجود ندارد');
  //           return of(null);
  //         })
  //       ),
  //       permissions: this.checkIsService.previewCheckIs(this.authorization).pipe(
  //         catchError(err => {
  //           console.error('❌ خطا در دریافت permissions:', err?.status, err);
  //           this.showError('امکان دریافت دسترسی‌ها وجود ندارد');
  //           return of(null);
  //         })
  //       ),
  //       letterProps: this.checkIsService.LetterPropertiesPreview(this.authentication, this.authorization, this.substituteId).pipe(
  //         catchError(err => {
  //           console.error('❌ خطا در دریافت letterProps:', err?.status, err);
  //           this.showError('امکان دریافت مشخصات نامه وجود ندارد');
  //           return of(null);
  //         })
  //       )
  //     }).subscribe({
  //       next: ({ pdf, permissions, letterProps }: any) => {

  //         // PDF
  //         if (pdf) {
  //           const url = URL.createObjectURL(pdf as Blob);
  //           this.pdfSrc = url;
  //         }

  //         // Permissions
  //         if (permissions) {
  //           this.idLetter = permissions?.idLetter;
  //           console.log('idLetter', this.idLetter);

  //           if (permissions?.printBtn) this.showPrint = true;
  //           if (permissions?.advancedPrintBtn) this.showAdvancedPrint = true;
  //           if (permissions?.editLetterBtn) this.showEditLetter = true;
  //           if (permissions?.outPutFormatBtn) this.showOutputFormat = true;
  //         }

  //         // Letter props
  //         if (letterProps) {
  //           this.signatures = letterProps?.signatures;
  //           this.marginTop = letterProps?.marginTop;
  //           this.marginLeft = letterProps?.marginLeft;
  //           this.letterReceivers = letterProps?.receivers;
  //           this.letterCopies = letterProps?.copies;

  //           if (letterProps?.pageWidth && letterProps?.pageHeight) {
  //             this.serverImageData = {
  //               ...this.serverImageData,
  //               width: letterProps.pageWidth,
  //               height: letterProps.pageHeight
  //             };
  //           }
  //         }

  //         this.isLoadingTemplate = false;
  //       },
  //       error: (err) => {
  //         // عملاً هیچوقت اجرا نمیشه چون هر سه catchError دارن، ولی برای اطمینان نگه‌داشته شده
  //         console.error('❌ خطای غیرمنتظره در forkJoin:', err);
  //         this.showError('خطایی رخ داد. لطفاً دوباره تلاش کنید');
  //         this.isLoadingTemplate = false;
  //       }
  //     });
  //   });
  // }

  convertCordinatePixelToPoint(cordinate: string): string {
    if (!cordinate) return cordinate;
    return cordinate
      .split(',')
      .map(v => this.convertPixelToPoint(Number(v.trim())))
      .join(',');
  }

  convertPixelToPoint(pixel: number): number {
    const DPI_RATIO = 72 / 96;
    return pixel * DPI_RATIO;
  }

  private getDefaultCheckBoxesList() {
    return [
      { id: 0, title: 'تاریخ نامه', name: 'date', checked: true },
      { id: 1, title: 'شماره نامه', name: 'noLetter', checked: true },
      { id: 2, title: 'کد پیگیری', name: 'id', checked: true },
      { id: 3, title: 'امضا', name: 'signatures', checked: true },
      { id: 4, title: 'پس زمینه', name: 'backGround', checked: true },
      { id: 5, title: 'ضمیمه', name: 'attachment', checked: true },
      { id: 6, title: 'عنوان نامه', name: 'topWord', checked: true },
      { id: 7, title: 'ْQR کد', name: 'QRCode', checked: true },
      { id: 8, title: 'واترمارک', name: 'waterMark', checked: true },
      { id: 9, title: 'قید الکترونیکی بودن نامه', name: 'haveLetterElectronical', checked: false },
    ];
  }

  ngAfterViewInit(): void {


    this.checkBoxesList = this.getDefaultCheckBoxesList()
    this.cdr.detectChanges();

    window.addEventListener('dblclick', this.dblClickHandler, { capture: true });

    window.addEventListener('wheel', (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, { passive: false, capture: true });
  }

  getAllUsersForPdf() {
    this.recipientList = [
      { id: 0, name: 'همه', checked: true },
      ...this.letterReceivers.map(r => ({ ...r, checked: true })),
    ];
    this.transcriptList = [
      { id: 0, name: 'همه', checked: true },
      ...this.letterCopies.map(t => ({ ...t, checked: true }))
    ];

    this.checkBoxesList = this.getDefaultCheckBoxesList()
    this.cdr.detectChanges();


    // ---- لاگ‌های دیباگ ----
  document.addEventListener('copy', () => console.log('[DEBUG] raw copy event on document (capture)'), true);
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      console.log('[DEBUG] Ctrl+C keydown | defaultPrevented:', e.defaultPrevented,
        '| selection:', window.getSelection()?.toString().length, 'chars');
    }
  }, true);
  document.addEventListener('selectionchange', () => {
    console.log('[DEBUG] selectionchange ->', window.getSelection()?.toString().length, 'chars');
  });
  }


  // onPagesLoaded(event: any) {
  //   this.renderAllSignatures();
  //   this.setupViewerResizeObserver();
  //   //  this.setupVisibilityObserver();
  //   this.setupVisibilityObserver();


  //   setTimeout(() => this.renderAllSignatures(), 1500);
  // }



  totalPages: number = 0;
  currentPageNumber: number = 1;

  onPagesLoaded(event: any) {
    this.totalPages = event?.pagesCount ?? 0;

    this.renderAllSignatures();
    // this.applyWatermarkToAllPages();
    this.setupViewerResizeObserver();
    this.setupVisibilityObserver();

    setTimeout(() => {
      // this.applyWatermarkToAllPages();
      this.renderAllSignatures()
    }, 1500);
    setTimeout(() => this.forceExternalLinksBlank(), 300);
  }


  goToPage(event: any) {
    let value = Number(event.target.value);

    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > this.totalPages) {
      value = this.totalPages;
    }

    this.currentPageNumber = value; // چون [(page)] بایندینگ دوطرفه‌ست، همین کافیه
  }

  private forceExternalLinksBlank(): void {
    const links = document.querySelectorAll('#viewer a[href]');
    links.forEach((a: any) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
  }






  private visibilityObserver: IntersectionObserver | null = null;
  private hasBeenHiddenOnce: boolean = false;
  private isFirstVisibility: boolean = true;

  // private setupVisibilityObserver(): void {
  //   const container = document.querySelector('.pdf-container') as HTMLElement;
  //   if (!container) return;

  //   this.visibilityObserver = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         if (this.isFirstVisibility) {
  //           this.isFirstVisibility = false;
  //           return;
  //         }

  //         if (this.hasBeenHiddenOnce && !this.isLoadingTemplate) {
  //           setTimeout(() => {
  //             this.renderAllSignatures();
  //           }, 300);
  //         }

  //         this.hasBeenHiddenOnce = false;
  //       } else {
  //         this.hasBeenHiddenOnce = true;
  //       }
  //     });
  //   }, { threshold: 0.1 });

  //   this.visibilityObserver.observe(container);
  // }

  renderAllSignatures(): void {
    const pages = document.querySelectorAll('#viewer .page');

    document.querySelectorAll('[id^="signature-"]').forEach(el => el.remove());

    this.signatures.forEach((sig: any) => {
      const pageEl = pages[sig.pageNumber - 1] as HTMLElement;
      if (!pageEl) return;

      const pageRect = pageEl.getBoundingClientRect();
      const scaleX = pageRect.width / this.serverImageData.width;
      const scaleY = pageRect.height / this.serverImageData.height;

      const coord = this.parseCoordinate(sig.cordinate);
      if (!coord) return;

      const sigEl = document.createElement('div');
      sigEl.id = `signature-${sig.sigId ?? sig.id}`;
      sigEl.style.position = 'absolute';
      sigEl.style.left = `${this.convertPointToPixel(coord.left + this.marginLeft)}px`;
      sigEl.style.top = `${this.convertPointToPixel(coord.top + this.marginTop)}px`;
      sigEl.style.width = `${this.convertPointToPixel(coord.width)}px`;
      sigEl.style.height = `${this.convertPointToPixel(coord.height)}px`;
      sigEl.style.zIndex = '1000';
      sigEl.style.boxSizing = 'border-box';
      sigEl.style.display = 'flex';
      sigEl.style.alignItems = 'center';
      sigEl.style.justifyContent = 'center';
      sigEl.style.fontFamily = 'Tahoma, sans-serif';
      sigEl.style.fontSize = '12px';
      sigEl.style.transition = 'background-color 0.2s ease';

      const background = sig.background ?? sig.sign;

      if (background) {
        sigEl.style.backgroundImage = `url(data:image/jpeg;base64,${background})`;
        sigEl.style.backgroundSize = 'contain';
        sigEl.style.backgroundRepeat = 'no-repeat';
        sigEl.style.backgroundPosition = 'center';
        sigEl.style.backgroundColor = 'transparent';
        sigEl.style.opacity = '1';
        sigEl.style.pointerEvents = 'none';
        sigEl.style.cursor = 'not-allowed';
      } else {
        const status = Number(sig.signStatus);

        switch (status) {
          case 0:
            sigEl.style.backgroundColor = 'rgba(111, 113, 114, 0.3)';
            sigEl.style.opacity = '0.7';
            sigEl.style.pointerEvents = 'all';
            sigEl.style.cursor = 'not-allowed';
            sigEl.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });
            break;

          case 1:
            sigEl.style.backgroundColor = 'rgba(231, 217, 24, 0.3)';
            sigEl.style.opacity = '0.7';
            sigEl.style.pointerEvents = 'all';
            sigEl.style.cursor = 'not-allowed';
            sigEl.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.showWarning('ثبت این امضا در این کارتابل امکان پذیر نمی باشد');
            });
            break;

          case 2:
            sigEl.style.backgroundColor = '#6ba1d8';
            sigEl.style.opacity = '0.9';
            sigEl.style.pointerEvents = 'all';
            sigEl.style.cursor = 'pointer';
            sigEl.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.ngZone.run(() => {
                this.onSignatureBoxClicked(sig);
              });
            });
            break;

          default:
            sigEl.style.backgroundColor = 'rgba(111, 113, 114, 0.3)';
            sigEl.style.opacity = '0.7';
            sigEl.style.pointerEvents = 'all';
            sigEl.style.cursor = 'not-allowed';
            sigEl.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });
        }
      }

      if (!background && sig.name) {
        const nameEl = document.createElement('span');
        nameEl.textContent = sig.name;
        nameEl.style.pointerEvents = 'none';
        nameEl.style.textAlign = 'center';
        nameEl.style.whiteSpace = 'nowrap';
        nameEl.style.overflow = 'hidden';
        nameEl.style.textOverflow = 'ellipsis';
        nameEl.style.maxWidth = '100%';
        nameEl.style.userSelect = 'none';
        nameEl.style.fontSize = '15px';
        sigEl.appendChild(nameEl);
      }

      pageEl.appendChild(sigEl);
    });
  }

  onSignatureBoxClicked(sig: any): void {
    this.selectedSignatureForModal = sig;
    this.showsignaturesbyuser = true;
    const authentication = sessionStorage.getItem('hash1')
    this.signerId = sig.id

    this.checkIsService.GetSignatures(authentication, this.authorization, sig.id).subscribe({
      next: (items: any[]) => {
        if (!items) return;
        this.signatureList = [...items];
      },
      error: (error: any) => {
        this.showsignaturesbyuser = false;
        this.signatureList = [];
        this.showError(error?.error?.Message || 'خطا در دریافت امضاها');
      }
    });
  }

  closeSignatureModal(): void {
    this.showsignaturesbyuser = false;
    this.signatureList = [];
    this.selectedSignatureForModal = null;
  }

  // onClickSignatureItem(sig: any): void {
  //   const target = this.selectedSignatureForModal;
  //   if (!target) return;
  //   const authentication = sessionStorage.getItem('hash1');
  //   this.isLoadingTemplate = true
  //   this.checkIsService
  //     .postServiceParhizkarSaveLetterBySignId(
  //       this.authorization,
  //       authentication,
  //       sig.signId,
  //       this.signerId,
  //       target.priority ?? 1
  //     )
  //     .subscribe({
  //       next: (res: any) => {
  //         this.isLoadingTemplate = false
  //         this.showsignaturesbyuser = false;
  //         this.signatureList = [];
  //         target.background = sig.sign;
  //         target.signStatus = 2;
  //         // this.refreshPanel()
  //         this.renderAllSignatures();
  //         this.showSuccess(res);

  //         const url = "/Hermes_web/automation/secretariat/assets/index.html?route=letterMaker"

  //         setTimeout(() => {
  //           // const tabData = {
  //           //   tabId: Number(this.idLetter),
  //           //   closAble: true,
  //           //   hafmanCode: '60142444',
  //           //   hint: { fa: 'ویرایش', en: 'edit', ar: '' },
  //           //   idMenu: Number(this.idLetter),
  //           //   linkForce: false,
  //           //   newIs: false,
  //           //   priority: '',
  //           //   rownum: '',
  //           //   title: { fa: 'ویرایش', en: 'edit', ar: '' },
  //           //   url: url,
  //           //   visible: false,
  //           //   key: '',
  //           // };
  //           const tabData = {
  //             tabId: Number(this.idLetter + this.idLetter),
  //             closAble: true,
  //             hafmanCode: String(this.idLetter + this.idLetter),
  //             hint: { fa: 'پیش نمایش', en: 'preview', ar: '' },
  //             idMenu: Number(this.idLetter + this.idLetter),
  //             linkForce: false,
  //             newIs: false,
  //             priority: '',
  //             rownum: '',
  //             title: { fa: 'پیش نمایش', en: 'preview', ar: '' },
  //             url: url,
  //             visible: false,
  //             key: '',
  //           };
  //           console.log('tabData' , tabData);

  //           window.parent.parent.parent.postMessage({ tab_data: tabData, kind: 'closeTab', idMenu: tabData.idMenu }, window.location.href);
  //         }, 1000);

  //       },
  //       error: (error: any) => {
  //         this.showError(error?.error?.Message);
  //         this.isLoadingTemplate = false
  //       }
  //     });
  // }


  onClickSignatureItem(sig: any): void {
    const target = this.selectedSignatureForModal;
    if (!target) return;
    const authentication = sessionStorage.getItem('hash1');
    this.isLoadingTemplate = true
    this.checkIsService
      .postServiceParhizkarSaveLetterBySignId(
        this.authorization,
        authentication,
        sig.signId,
        this.signerId,
        target.priority ?? 1
      )
      .subscribe({
        next: (res: any) => {
          this.isLoadingTemplate = false
          this.showsignaturesbyuser = false;
          this.signatureList = [];
          target.background = sig.sign;
          target.signStatus = 2;
          this.renderAllSignatures();
          this.showSuccess(res);
          this.refreshPanel()
          const url = "/Hermes_web/automation/secretariat/assets/index.html?route=letterMaker"

          setTimeout(() => {
            const idStr = String(this.idLetter);
            const combinedId = idStr + idStr;

            const tabData = {
              tabId: Number(combinedId),
              closAble: true,
              hafmanCode: combinedId,
              hint: { fa: 'پیش نمایش', en: 'preview', ar: '' },
              idMenu: Number(combinedId),
              linkForce: false,
              newIs: false,
              priority: '',
              rownum: '',
              title: { fa: 'پیش نمایش', en: 'preview', ar: '' },
              url: url,
              visible: false,
              key: '',
            };

            window.parent.parent.parent.postMessage(
              { tab_data: tabData, kind: 'closeTab', idMenu: tabData.idMenu },
              window.location.href
            );
          }, 300);
        },
        error: (error: any) => {
          this.showError(error?.error?.Message);
          this.isLoadingTemplate = false
        }
      });
  }

  refreshPanel() {
    const idLetter = this.idLetter;
    const dbName = 'secretariatDB';
    const storeName = 'secretariat';

    indexedDB.databases().then((databases) => {
      const exists = databases.some(db => db.name === dbName);

      const version = exists ? undefined : 1;
      const request = window.indexedDB.open(dbName, version);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath: 'id',
            autoIncrement: true
          });
        }
      };

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const item = {
          action: 'workflow',
          idLetter
        };

        const addRequest = store.add(item);

        addRequest.onsuccess = () => {
          console.log(idLetter, 'idLetter - Added successfully to IndexedDB');
        };

        transaction.oncomplete = () => {
          db.close();
        };

      };
    });
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  normalizePersianText(text: any) {
    if (!text) return '';

    return text
      .toString()
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/[\u064B-\u065F]/g, '')
      .trim();
  }

  //this.authentication , this.authorization ,
  loadDocument(): void {
    this.checkIsService.LetterPropertiesPreview(this.authentication , this.authorization ,this.substituteId).subscribe({
      next: (res: any) => {
        this.signatures = res?.signatures;
        this.marginTop = res?.marginTop;
        this.marginLeft = res?.marginLeft;
        this.letterReceivers = res?.receivers
        this.letterCopies = res?.copies
        if (res?.pageWidth && res?.pageHeight) {
          this.serverImageData = {
            ...this.serverImageData,
            width: res.pageWidth,
            height: res.pageHeight
          };
        }
        this.renderAllSignatures()
      }
    })
  }

  private setupViewerResizeObserver(): void {
    const viewer = document.querySelector('#viewer');
    if (!viewer) return;

    this.viewerResizeObserver = new ResizeObserver(() => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.renderAllSignatures();
        // this.applyWatermarkToAllPages();
      }, 100);
    });
    this.viewerResizeObserver.observe(viewer);
  }

  convertPointToPixel(point: number): number {
    const DPI_RATIO = 96 / 72;
    const pixel = point * DPI_RATIO;
    const finalPixel = pixel;
    return finalPixel;
  }

  signatures: any[] = [];
  showSignatures = false;


  onClickUser(user: any) {
    this.showSignatures = true;
    const indexInSamePage = this.signatures.findIndex(
      (item: any) => item.id === user.id && item.pageNum === this.sigPageNumber
    );

    if (indexInSamePage > -1) {
      return;
    }

    const newSignature = {
      id: user.id,
      name: user.name,
      width: user.width || 150,
      height: user.height || 100,
      pageNum: this.sigPageNumber
    };

    this.signatures.push(newSignature);
  }

  onRecipientChange(recipient: any, event: Event) {

    const isChecked = (event.target as HTMLInputElement).checked;
    recipient.checked = isChecked;
    this.recipentChecked = recipient.checked;

    if (recipient.id === 0) {
      this.recipientList.forEach(item => item.checked = isChecked);
      return;
    }

    const allChecked = this.recipientList.slice(1).every(item => item.checked === true);
    if (allChecked) this.recipientList[0].checked = allChecked;

    const allUnChecked = this.recipientList.slice(1).every(item => item.checked === false);
    if (allUnChecked) this.recipientList[0].checked = false;

  }

  onTranscriptChange(transcript: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    transcript.checked = isChecked;
    this.transcriptChecked = transcript.checked;
    if (transcript.id === 0) {
      this.transcriptList.forEach((item: any) => {
        item.checked = isChecked;
      })
    }

    const allChecked = this.transcriptList.slice(1).every(item => item.checked === true);
    if (allChecked) this.transcriptList[0].checked = allChecked;

    const allUnChecked = this.transcriptList.slice(1).every(item => item.checked === false);
    if (allUnChecked) this.transcriptList[0].checked = false;
  }

  onOptionChange(option: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    option.checked = isChecked;
  }

  // findDataForPrint(ContentTypes: ContentType) {
  //   const data = [...this.recipientList, ...this.transcriptList];
  //   const optionData = [...this.checkBoxesList];

  //   const users = data
  //     .filter(item => item?.checked && item?.rowId != null)
  //     .map(item => item.rowId);

  //   const newOption = optionData
  //     .filter(item => item?.checked && item?.name != null)
  //     .map(item => item.name);

  //   const model: optionalData = { rowsId: users, letterItems: newOption, ContentType: ContentTypes };
  //   return model;
  // }

  findDataForPrint(ContentTypes: ContentType, extraPdf: boolean = false) {
    const data = [...this.recipientList, ...this.transcriptList];
    const optionData = [...this.checkBoxesList];

    const users = data
      .filter(item => item?.checked && item?.rowId != null)
      .map(item => item.rowId);

    const newOption = optionData
      .filter(item => item?.checked && item?.name != null)
      .map(item => item.name);

    const model: optionalData = {
      rowsId: users,
      letterItems: newOption,
      ContentType: ContentTypes,
      extraPdf: extraPdf
    };
    return model;
  }

  onclickWord() {

  }

  private downloadFileFromBase64Word(base64: string, fileType: string = 'docx'): void {
    const a = document.createElement('a');
    a.href = base64;
    a.download = `document.${fileType}`;
    a.click();
  }

  savePdf(model: any) {
    this.isLoadingTemplate = true;
    this.showPrintSettings = false;
    if (model.ContentType === 3) {
      this.checkIsService
        .postServiceParhizkarSavePdf(this.authorization, this.authentication, model)
        .subscribe({
          next: (res: any) => {
            const url = URL.createObjectURL(res as Blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document.docx`;
            a.click();
            URL.revokeObjectURL(url);
            this.isLoadingTemplate = false;
            this.showAdvancedPrint = true;
            this.showPreviewOptions = true;
            // this.checkBoxesList = [...this.checkBoxesList]
            // console.log('this.checkBoxesList' , this.checkBoxesList);

          },
          error: () => {
            this.showError('امکان دریافت سند وجود ندارد');
            this.isLoadingTemplate = false;
            this.showAdvancedPrint = true;
            this.showPreviewOptions = true
          }
        });
    }
    else if (model.ContentType === 1) {
      this.checkIsService
        .postServiceParhizkarSavePdf(this.authorization, this.authentication, model)
        .subscribe({
          next: (res: any) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result as string;
              this.downloadFileFromBase64(base64);
            };
            reader.readAsDataURL(res);
            this.isLoadingTemplate = false;
            this.showAdvancedPrint = true;
            this.showPreviewOptions = true;
          },
          error: () => {
            this.showError('امکان دریافت سند وجود ندارد');
            this.isLoadingTemplate = false;
            this.showAdvancedPrint = true;
            this.showPreviewOptions = true
          }
        });
    } else {
      this.checkIsService
        .postServiceParhizkarSavePdf(this.authorization, this.authentication, model)
        .subscribe({
          next: (res: any) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result as string;
              const pdfKey = 'pdf_' + Date.now();

              (window.top as any).__pdfStore = (window.top as any).__pdfStore ?? {};
              (window.top as any).__pdfStore[pdfKey] = base64;

              const url =
                '/Hermes_Web/automation/pdfViewer/assets/pdfViewer.html?route=pdf-viewer' +
                '&param=' + pdfKey;

              // const tabData = {
              //   tabId: 1212,
              //   closAble: true,
              //   hafmanCode: 'Print',
              //   hint: { fa: 'چاپ', en: 'print', ar: 'طباعة' },
              //   idMenu: '2221',
              //   linkForce: false,
              //   newIs: false,
              //   priority: '',
              //   rownum: '',
              //   title: { fa: 'چاپ', en: 'print', ar: 'طباعة' },
              //   url: url,
              //   visible: false,
              //   key: '',
              // };

              const letterStd = String(this.idLetter) + '10'

              const tabDataDelete = {
                tabId: Number(letterStd),
                closAble: true,
                hafmanCode: letterStd,
                hint: { fa: 'پیش نمایش', en: 'preview', ar: '' },
                idMenu: Number(letterStd),
                linkForce: false,
                newIs: false,
                priority: '',
                rownum: '',
                title: { fa: 'پیش نمایش', en: 'preview', ar: '' },
                url: url,
                visible: false,
                key: '',
              };

              window.parent.parent.parent.postMessage(
                { tab_data: tabDataDelete, kind: 'closeTab', idMenu: tabDataDelete.idMenu },
                window.location.href
              );


              setTimeout(() => {
                const tabData = {
                  tabId: Number(letterStd),
                  closAble: true,
                  hafmanCode: letterStd,
                  hint: { fa: 'چاپ', en: 'print', ar: 'طباعة' },
                  idMenu: Number(letterStd),
                  linkForce: false,
                  newIs: false,
                  priority: '',
                  rownum: '',
                  title: { fa: 'چاپ', en: 'print', ar: 'طباعة' },
                  url: url,
                  visible: false,
                  key: '',
                };
                this.tabService.tab(tabData);
                this.isLoadingTemplate = false;
                this.showAdvancedPrint = true;
                this.showPreviewOptions = true;
              }, 50);

            };
            reader.readAsDataURL(res);
            this.isLoadingTemplate = false;
            this.showAdvancedPrint = true;
            this.showPreviewOptions = true;
          },
          error: () => {
            this.showError('امکان دریافت سند وجود ندارد');
            this.isLoadingTemplate = false;
            this.showAdvancedPrint = true;
            this.showPreviewOptions = true
          }
        });
    }

    this.newList = [];
    this.newOption = [];
  }

  private downloadFileFromBase64(base64: string): void {
    const mimeType = base64.split(';')[0].split(':')[1];
    const extension = mimeType.split('/')[1];

    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = `file.${extension}`;
    a.click();

    URL.revokeObjectURL(objectUrl);
  }

  // onClickPrint(contentType: number , extraPdf?: boolean) {
  //   this.getAllUsersForPdf()
  //   const model = this.findDataForPrint(contentType)
  //   this.savePdf(model)
  // }


  onClickPrint(contentType: number, extraPdf: boolean = false) {
    this.getAllUsersForPdf();
    const model = this.findDataForPrint(contentType, false); // همیشه false
    this.savePdf(model);
  }

  // onClickAdvancedPrint() {
  //   const model = this.findDataForPrint(0)
  //   this.savePdf(model);
  //   this.newList = [];
  //   this.newOption = [];
  //   // this.checkBoxesList

  // }



  onClickAdvancedPrint() {
    const model = this.findDataForPrint(0, true); // اینجا true
    this.savePdf(model);
    this.newList = [];
    this.newOption = [];
  }

  onclcikAdvancedPrintButton() {
    this.getAllUsersForPdf();
    this.showPrintSettings = true;
    this.showPreviewOptions = false
  }

  onclickOutputFormat(e: Event) {
    e.stopPropagation()
    this.ShowOutputType = !this.ShowOutputType
  }
  onClickShowOutputType() { }
  onClickPdf() { this.onClickPrint(0) }
  onClcikTiff() { this.onClickPrint(1) }
  onClcikGif() { this.onClickPrint(2) }


  private parseCoordinate(coord: string): {
    left: number;
    top: number;
    width: number;
    height: number;
  } | null {
    if (!coord) return null;

    const parts = coord.split(',').map(v => Number(v.trim()));
    if (parts.length !== 4 || parts.some(isNaN)) return null;

    const [left, top, width, height] = parts;
    return { left, top, width, height };
  }

  selectedSignatureId: number | null = null;

  onSignatureClicked(signatureId: number) {
    this.selectedSignatureId = signatureId;
    this.showsignaturesbyuser = true;
  }

  onClickSignature(selectedSig: { id: number; title: string }) {
    if (this.selectedSignatureId == null) return;
    const targetSignature = this.savedSignatures.find(s => s.id === this.selectedSignatureId);
    if (!targetSignature) return;
    targetSignature.name = selectedSig.title;
    targetSignature.sourceSignatureId = selectedSig.id;
    this.showsignaturesbyuser = false;
    this.selectedSignatureId = null;
  }

  toPersianDigitsletterNumber = (value: string): string => {
    return new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(Number(value));
  };

  showSuccess(message: string) {
    this.snackBar.open(message, 'باشه', { duration: 3000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ['notif-success'] });
  }
  showError(message: string) {
    this.snackBar.open(message, 'باشه', { duration: 3000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ['notif-error'] });
  }
  showWarning(message: string) {
    this.snackBar.open(message, 'باشه', { duration: 3000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ['notif-warning'] });
  }
  showHelper(message: string) {
    this.snackBar.open(message, 'باشه', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top', panelClass: ['notif-helper'] });
  }

  toPersianNumber(value: number | string): string {
    return value.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
  }

  ngOnDestroy(): void {
    this.viewerResizeObserver?.disconnect();
    // this.visibilityObserver?.disconnect();
    // this.visibilityObserver?.disconnect();
    window.removeEventListener('dblclick', this.dblClickEvent);

    if (this.resizeTimer) clearTimeout(this.resizeTimer);

    sessionStorage.removeItem('AuthCheckis');

    if ((this as any).signatures) (this as any).signatures = [];
    if ((this as any).recipientList) (this as any).recipientList = [];
    if ((this as any).transcriptList) (this as any).transcriptList = [];
  }

  onclickEditLetter() {
    sessionStorage.removeItem('AuthCheckis');
    const prevToedit = 'prevToedit'
    setTimeout(() => {
      const url = '/Hermes_Web/automation/typeAI/assets/typeAI.html?route=typeAI'
        + '&param=' + this.param + '&param3=' + prevToedit
      window.location.href = url;
    }, 10);
  }

  onClosePrintSettings(): void {
    this.showPrintSettings = false
    this.showPreviewOptions = !this.showPreviewOptions
  }

  // private visibilityObserver: IntersectionObserver | null = null;

  private fakeScrollToRefresh(): void {
    const scrollable = document.querySelector('#viewer') as HTMLElement;
    if (!scrollable) return;

    const originalScrollTop = scrollable.scrollTop;

    // اسکرول خیلی کوچیک به پایین
    scrollable.scrollTop = originalScrollTop + 5;
    scrollable.dispatchEvent(new Event('scroll', { bubbles: true }));

    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollable.scrollTop = originalScrollTop;
        scrollable.dispatchEvent(new Event('scroll', { bubbles: true }));

        // resize فیک برای صدا زدن renderAllSignatures
        window.dispatchEvent(new Event('resize'));
      }, 50);
    });
  }

  // private setupVisibilityObserver(): void {
  //   const container = document.querySelector('.pdf-container') as HTMLElement;
  //   if (!container) {
  //     return;
  //   }

  //   this.visibilityObserver = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         setTimeout(() => {
  //           // this.loadPdf()
  //           this.renderAllSignatures();
  //           this.fakeScrollToRefresh();
  //         }, 300);
  //       } else {
  //       }
  //     });
  //   }, { threshold: 0.1 });

  //   this.visibilityObserver.observe(container);
  // }



  // private visibilityObserver: IntersectionObserver | null = null;
  private isPageCurrentlyVisible: boolean = false; // فلگ جدید

  private setupVisibilityObserver(): void {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    if (!container) {
      return;
    }

    this.visibilityObserver?.disconnect();

    this.visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // فقط وقتی قبلاً "دیده نمی‌شد" و الان دیده شد، اجرا کن
          if (!this.isPageCurrentlyVisible) {
            this.isPageCurrentlyVisible = true;
            // setTimeout(() => {
            this.fakeScrollToRefresh();
            this.loadVisibleDocument()
            // if (this.param2 !== null && this.param2 == 'editToPrev') {
            //   this.showEditLetter = false
            // } else {
            //   if (permissions?.editLetterBtn) this.showEditLetter = true;
            // }

            // this.loadPdf()
            // this.renderAllSignatures();
            // }, 10);
          }
        } else {
          // خارج شد -> آماده برای اجرای مجدد در ورود بعدی
          this.isPageCurrentlyVisible = false;
        }
      });
    }, { threshold: 0.1 });

    this.visibilityObserver.observe(container);
  }


  loadVisibleDocument() {
    forkJoin({
      pdf: this.checkIsService.parhizkarPreviewService(this.authorization), // this.authorization
      permissions: this.checkIsService.previewCheckIs(this.authorization),
      letterProps: this.checkIsService.LetterPropertiesPreview(this.authentication , this.authorization ,this.substituteId) //this.authentication , this.authorization ,
    }).subscribe({
      next: ({ pdf, permissions, letterProps }: any) => {
        // PDF
        const url = URL.createObjectURL(pdf as Blob);
        this.pdfSrc = url;
        this.idLetter = permissions?.idLetter;

        // this.selectedOlgo = list[0]?.title;

        const olgo = this.list.find((item: any) => item.idTemplate === letterProps?.templateId)
        if (olgo) {
          this.selectedOlgo = olgo?.title
        } else {
          this.selectedOlgo = '*عدم دسترسی به سربرگ*'
        }

        // Permissions
        if (permissions?.printBtn) this.showPrint = true;
        if (permissions?.advancedPrintBtn) this.showAdvancedPrint = true;
        if (permissions?.outPutFormatBtn) this.showOutputFormat = true;
        if (this.param2 !== null && this.param2 == 'editToPrev') {
          this.showEditLetter = false
        } else {
          if (permissions?.editLetterBtn) this.showEditLetter = true;
        }

        // Letter props
        this.signatures = letterProps?.signatures;
        this.marginTop = letterProps?.marginTop;
        this.marginLeft = letterProps?.marginLeft;
        this.letterReceivers = letterProps?.receivers;
        this.letterCopies = letterProps?.copies;

        if (letterProps?.pageWidth && letterProps?.pageHeight) {
          this.serverImageData = {
            ...this.serverImageData,
            width: letterProps.pageWidth,
            height: letterProps.pageHeight
          };
        }

        this.isLoadingTemplate = false;
        this.isPageCurrentlyVisible = true;
        // setTimeout(() => this.applyWatermarkToAllPages(), 500);

      },
      error: (err) => {
        console.error('❌ error:', err);
        this.isLoadingTemplate = false;
      }
    });
  }








  // ==================== واترمارک (نسخه سازگار با ngx-extended-pdf-viewer) ====================

  private generateWatermarkTile(
    text: string,
    angleDeg: number = -45,
    fontSize: number = 20,
    color: string = '#000000',
    opacity: number = 0.12,
    tileSize: number = 150
  ): string {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${tileSize}" height="${tileSize}">
      <text x="50%" y="50%"
            font-family="Yekan, Tahoma, sans-serif"
            font-size="${fontSize}"
            fill="${color}"
            fill-opacity="${opacity}"
            text-anchor="middle"
            dominant-baseline="middle"
            transform="rotate(${angleDeg} ${tileSize / 2} ${tileSize / 2})">
        ${text}
      </text>
    </svg>`;

    const encoded = btoa(unescape(encodeURIComponent(svg)));
    return `url("data:image/svg+xml;base64,${encoded}")`;
  }

  private applyWatermarkToPage(pageNumber: number, text: string = 'محرمانه'): void {
    const pages = document.querySelectorAll('#viewer .page');
    const pageEl = pages[pageNumber - 1] as HTMLElement;
    if (!pageEl) return;

    const existingId = `watermark-page-${pageNumber}`;
    document.getElementById(existingId)?.remove();

    // صفحه باید position: relative داشته باشه تا واترمارک absolute داخلش درست جا بگیره
    if (getComputedStyle(pageEl).position === 'static') {
      pageEl.style.position = 'relative';
    }

    const watermark = document.createElement('div');
    watermark.id = existingId;
    watermark.style.position = 'absolute';
    watermark.style.top = '0';
    watermark.style.left = '0';
    watermark.style.width = '100%';
    watermark.style.height = '100%';
    watermark.style.pointerEvents = 'none';
    watermark.style.zIndex = '500'; // زیر امضاها (1000)
    watermark.style.backgroundImage = this.generateWatermarkTile(text);
    watermark.style.backgroundRepeat = 'repeat';

    pageEl.appendChild(watermark);
  }

  private applyWatermarkToAllPages(): void {
    document.querySelectorAll('[id^="watermark-page-"]').forEach(el => el.remove());
    for (let i = 1; i <= this.totalPages; i++) {
      this.applyWatermarkToPage(i);
    }
  }


















}

