import type * as React from 'react';

export type IconName = 'home' | 'file' | 'filePlus' | 'scale' | 'route' | 'send' | 'copy' | 'message' | 'calendar' | 'bell' | 'user' | 'search' | 'chevronRight' | 'arrowLeft' | 'check' | 'clock' | 'alert' | 'x' | 'info' | 'grid' | 'building' | 'upload' | 'arrowRight' | 'lock' | 'checkCircle' | 'mail' | 'phone' | 'shield' | 'idCard' | 'mapPin' | 'swap' | 'plus' | 'folder' | 'chevronLeft' | 'menu' | 'chevronDown' | 'eye' | 'eyeOff' | 'trash' | 'star' | 'archive' | 'filter' | 'sort' | 'briefcase' | 'wallet' | 'pen' | 'logout' | 'funnel' | 'sortDesc' | 'download';

export interface IconProps { name: IconName; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** `gold` only for the home BannerCarousel button; `light` / `outline-light` only on red backgrounds. */
  variant?: 'primary' | 'secondary' | 'tonal' | 'tint' | 'ghost' | 'light' | 'outline-light' | 'gold';
  size?: 'md' | 'sm';
  block?: boolean;
  icon?: IconName;
  /** Shows a spinner instead of the icon, sets aria-busy and blocks clicks ("Đang đăng nhập…"). */
  loading?: boolean;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface LinkArrowProps { href?: string; onClick?: () => void; disabled?: boolean; /** false: chỉ chữ, không mũi tên (liên kết ở đầu khối trên Trang chủ app TATC, 02/11/2026). */ arrow?: boolean; children: React.ReactNode }
export declare function LinkArrow(props: LinkArrowProps): React.ReactElement;

export interface SectionHeaderProps { variant?: 'serif' | 'plain'; title: string; eyebrow?: string; align?: 'start' | 'center'; tone?: 'light' | 'dark'; action?: React.ReactNode }
export declare function SectionHeader(props: SectionHeaderProps): React.ReactElement;

export interface HeroStat { value: string; label: string }
export interface HeroBannerProps { title: string; description?: string; imageSrc?: string; actions?: React.ReactNode; note?: string; stats?: HeroStat[] }
export declare function HeroBanner(props: HeroBannerProps): React.ReactElement;

export interface ServiceCardProps { icon: IconName; title: string; description?: string; linkLabel?: string; onClick?: () => void; disabled?: boolean }
export declare function ServiceCard(props: ServiceCardProps): React.ReactElement;

export interface ProcessStep { icon?: IconName; title: string; description?: string }
export interface ProcessStepsProps { title: string; eyebrow?: string; steps: ProcessStep[]; variant?: 'brand' | 'light' }
export declare function ProcessSteps(props: ProcessStepsProps): React.ReactElement;

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  help?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  /** Leading icon inside the field (e.g. `idCard`, `lock`). */
  icon?: IconName;
  /** Shows a clear button while the field has a value. */
  onClear?: () => void;
  /** With `type="password"`: show the reveal toggle (default true). */
  revealable?: boolean;
  /** Shows the counter under the field; needs `maxLength` and/or `minLength`. */
  showCount?: boolean;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

/** Default shows a status dot; pass `icon` to show an icon instead, or `icon={false}` for neither. */
export interface StatusBadgeProps { variant?: 'fill' | 'outline'; tone?: 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'brand'; icon?: IconName | false; children: React.ReactNode }
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement;

export interface TabItem { key: string; label: string; count?: number; disabled?: boolean }
export interface TabsProps { items: TabItem[]; value?: string; defaultValue?: string; onChange?: (key: string) => void; label?: string; variant?: 'underline' | 'chip' }
export declare function Tabs(props: TabsProps): React.ReactElement;

export interface ServiceTileProps { illustration?: IllustrationName; icon?: IconName; label: string; count?: number; onClick?: () => void; disabled?: boolean }
export declare function ServiceTile(props: ServiceTileProps): React.ReactElement;

export interface CaseCardProps {
  caseNo: string; title: string; codeLabel?: string; kind?: string;
  status?: string; statusTone?: StatusBadgeProps['tone'];
  court?: string; meta?: string[]; date?: string; starred?: boolean; onStar?: () => void; onArchive?: () => void; onClick?: () => void; loading?: boolean; children?: React.ReactNode;
}
export declare function CaseCard(props: CaseCardProps): React.ReactElement;

export interface TimelineStep { title: string; date?: string; description?: string; state: 'done' | 'current' | 'upcoming' }
export interface TimelineProps { steps: TimelineStep[]; currentLabel?: string }
export declare function Timeline(props: TimelineProps): React.ReactElement;

export interface AppBarAction { icon?: IconName; /** Text action shown in brand red on `variant="plain"`, e.g. "Lưu nháp". */ text?: string; label?: string; onClick?: () => void; dot?: boolean; /** Initials for the account button, e.g. "TR". */ avatar?: string }
export interface AppBarProps { title: string; subtitle?: string; variant?: 'brand' | 'plain' | 'page'; logoSrc?: string; onBack?: () => void; actions?: AppBarAction[] }
export declare function AppBar(props: AppBarProps): React.ReactElement;

export interface BottomNavItem { key: string; icon: IconName; label: string; primary?: boolean; onClick?: () => void }
export interface BottomNavProps { items: BottomNavItem[]; active: string; onChange?: (key: string) => void; /** false: chỉ hiện biểu tượng, tên đọc bằng aria-label (app TATC dùng từ 02/11/2026). */ labels?: boolean }
export declare function BottomNav(props: BottomNavProps): React.ReactElement;

export type IllustrationName = 'nopDon' | 'traCuuHoSo' | 'lichXetXu' | 'xetXuTrucTuyen' | 'tongDat' | 'trichLuc' | 'khieuNai' | 'lichTiepDan' | 'huongDan' | 'anPhi' | 'banAn' | 'hoTro' | 'chungCu' | 'uyQuyen' | 'cccd' | 'chat' | 'banSao' | 'caiDat' | 'danhGia' | 'doiLich' | 'doiNguoi' | 'hanhChinh' | 'hoaGiai' | 'hoan' | 'hoiDap' | 'huongDanSD' | 'lichHen' | 'lichHuy' | 'nhacViec' | 'phaSan' | 'phanTo' | 'quaHan' | 'saoChup' | 'tinTuc' | 'toCao' | 'vangMat' | 'xemXet' | 'yeuCau';
export interface IllustrationProps { name: IllustrationName; label?: string; className?: string }
export declare function Illustration(props: IllustrationProps): React.ReactElement;
export interface HomeHeaderProps { greeting: string; /** Shows the calendar button next to the bell. */ onCalendar?: () => void; /** false: bỏ hàng Quốc huy + tên cổng, lời chào nằm cùng hàng với chuông (app TATC từ 02/11/2026). */ brand?: string | false; role?: string; canSwitchRole?: boolean; onRoleClick?: () => void; subtitle?: string; logoSrc?: string; unread?: boolean; onBell?: () => void; searchPlaceholder?: string; onSearch?: () => void }
export declare function HomeHeader(props: HomeHeaderProps): React.ReactElement;
export interface BannerSlide { imageSrc?: string; eyebrow?: string; title: string; description?: string; cta?: string; onClick?: () => void }
export declare function BannerCarousel(props: { slides: BannerSlide[] }): React.ReactElement;
export interface QuickActionProps { icon: IconName; title: string; subtitle?: string; tone?: 'red' | 'plain'; size?: 'lg' | 'md'; onClick?: () => void; disabled?: boolean }
export declare function QuickAction(props: QuickActionProps): React.ReactElement;
export interface NewsCardProps { imageSrc?: string; title: string; date?: string; tag?: string; onClick?: () => void; disabled?: boolean }
export declare function NewsCard(props: NewsCardProps): React.ReactElement;
export interface FormSectionProps { title: string; status?: 'done' | 'todo'; defaultOpen?: boolean; open?: boolean; onToggle?: (open: boolean) => void; children?: React.ReactNode }
export declare function FormSection(props: FormSectionProps): React.ReactElement;
export interface SelectFieldProps { placeholder?: string; value?: string; required?: boolean; icon?: IconName; label?: string; onClick?: () => void; labelVisible?: boolean; onClear?: () => void; open?: boolean; options?: (string | { label: string; value?: string })[]; onSelect?: (option: string | { label: string; value?: string }) => void; error?: string; disabled?: boolean }
export declare function SelectField(props: SelectFieldProps): React.ReactElement;
export interface OptionItemProps { illustration: IllustrationName; title: string; meta?: string; checked?: boolean; onChange?: (checked: boolean) => void; onInfo?: () => void; disabled?: boolean }
export declare function OptionItem(props: OptionItemProps): React.ReactElement;
export interface SummaryBarProps { title?: string; total?: string; rows?: { label: string; value: string }[]; primaryLabel?: string; primaryDisabled?: boolean; onPrimary?: () => void; secondaryLabel?: string; onSecondary?: () => void; defaultOpen?: boolean }
export declare function SummaryBar(props: SummaryBarProps): React.ReactElement;
export interface SheetMenuItem { illustration: IllustrationName; label: string; description?: string; onClick?: () => void }
export declare function SheetMenu(props: { title?: string; items: SheetMenuItem[] }): React.ReactElement;
export interface FilterCardProps { placeholder?: string; submitLabel?: string; onSubmit?: () => void; children?: React.ReactNode; loading?: boolean }
export declare function FilterCard(props: FilterCardProps): React.ReactElement;
export interface CaseRef { code: string; title?: string; /** Default "Vụ án". */ label?: string }
export interface RecordCardProps { code?: string; codeLabel?: string; kind?: string; title?: string; court?: string; /** Extra info between court and date, e.g. "Người ký: …". */ meta?: string[]; date?: string; status?: string; statusTone?: StatusBadgeProps['tone']; caseRef?: CaseRef; starred?: boolean; onStar?: () => void; onArchive?: () => void; onClick?: () => void; loading?: boolean; /** Extra content under the status, e.g. CaseProgress. */ children?: React.ReactNode }
export declare function RecordCard(props: RecordCardProps): React.ReactElement;
export declare function ChatFab(props: { label?: string; onClick?: () => void; style?: React.CSSProperties }): React.ReactElement;

export interface StepperProps { steps: string[]; current: number }
export declare function Stepper(props: StepperProps): React.ReactElement;
export interface FileItemProps { name: string; meta?: string; status?: 'done' | 'uploading' | 'error'; progress?: number; error?: string; onRemove?: () => void }
export declare function FileItem(props: FileItemProps): React.ReactElement;
export interface FileUploadProps { hint?: string; shortHint?: string; title?: string; files?: FileItemProps[]; max?: number; accept?: string; multiple?: boolean; uploadLabel?: string; libraryLabel?: string; onPick?: (files: File[]) => void; onLibrary?: () => void; disabled?: boolean; error?: string }
export declare function FileUpload(props: FileUploadProps): React.ReactElement;
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: React.ReactNode; error?: string }
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
export interface SegmentedOption { value: string; label: string; disabled?: boolean }
export interface SegmentedControlProps { options: SegmentedOption[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; label?: string; disabled?: boolean }
export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;
export declare function BackLink(props: { href?: string; onClick?: () => void; children: React.ReactNode }): React.ReactElement;
/** color 1–20: bộ màu nhãn Trầm (token tag-N-bg / tag-N-text). Không có color: kiểu đỏ thương hiệu. */
export declare function Tag(props: { children: React.ReactNode; color?: number }): React.ReactElement;
export interface NoticeProps { /** 'neutral' (mặc định): ghi chú xám trong form. 'reminder': khối nhắc việc cần làm – thẻ trắng, hình minh họa, tiêu đề, nút hành động, nút đóng. */ tone?: 'neutral' | 'reminder'; /** Biểu tượng nét cho kiểu neutral. */ icon?: IconName; /** Hình minh họa cho kiểu reminder (mặc định 'uyQuyen'). */ illustration?: IllustrationName; role?: string; title?: string; children?: React.ReactNode; actionLabel?: string; onAction?: () => void; /** Có onClose thì hiện nút đóng (X). */ onClose?: () => void; closeLabel?: string }
export declare function Notice(props: NoticeProps): React.ReactElement;
export interface InfoItem { label: string; value: React.ReactNode; mono?: boolean }
export interface InfoListProps { items: InfoItem[]; variant?: 'box' | 'rows' | 'kv' }
export declare function InfoList(props: InfoListProps): React.ReactElement;
export declare function ActionBar(props: { children: React.ReactNode }): React.ReactElement;
export interface DialogProps { title: string; description?: string; variant?: 'sheet' | 'center'; open?: boolean; inline?: boolean; onClose?: () => void; footer?: React.ReactNode; children?: React.ReactNode }
export declare function Dialog(props: DialogProps): React.ReactElement | null;
export interface AccordionGroup { key: string; title: string; meta?: string; items: { key: string; label: string }[] }
export interface AccordionProps { groups: AccordionGroup[]; value?: string; onSelect?: (key: string) => void; defaultOpen?: string[]; open?: string[]; onToggle?: (open: string[]) => void }
export declare function Accordion(props: AccordionProps): React.ReactElement;

export type Tone = 'info' | 'warning' | 'danger' | 'success';
export interface TaskItemData { day: string; month: string; title: string; code?: string; remain?: string; status?: string; tone?: Tone; onClick?: () => void }
export declare function TaskList(props: { items: TaskItemData[] }): React.ReactElement;
export interface StatSummaryProps { variant?: 'brand' | 'plain'; title?: string; stats?: { value: string; label: string; onClick?: () => void }[]; amountLabel?: string; amount?: string; subs?: { label: string; value: string }[] }
export declare function StatSummary(props: StatSummaryProps): React.ReactElement;
export interface MenuItem { /** Line icon; ignored when illustration is set. */ icon?: IconName; /** Multi-colour illustration in a 44px white circle (bottom-sheet menus). */ illustration?: IllustrationName; label: string; description?: string; count?: string; danger?: boolean; onClick?: () => void }
export declare function MenuList(props: { groups?: MenuItem[][]; items?: MenuItem[] }): React.ReactElement;
export interface ProfileCardProps { /** 'card' (mặc định): thẻ đỏ có ảnh đại diện. 'header': đặt trong header đỏ như HomeHeader, không nền thẻ, không ảnh đại diện (màn Cá nhân từ 02/11/2026). */ variant?: 'card' | 'header'; name: string; initials: string; role?: string; canSwitchRole?: boolean; onRoleClick?: () => void; subtitle?: string; onOpen?: () => void; openLabel?: string }
export declare function ProfileCard(props: ProfileCardProps): React.ReactElement;
export interface MailItemData { from: string; time: string; title: string; deadline?: string; remain?: string; tone?: Tone; unread?: boolean; starred?: boolean; onClick?: () => void; onStar?: () => void }
export declare function MailList(props: { items: MailItemData[] }): React.ReactElement;
export interface NotificationData { icon?: IconName; group: string; time: string; title: string; description?: string; code?: string; unread?: boolean; onClick?: () => void }
export declare function NotificationList(props: { items: NotificationData[] }): React.ReactElement;
export interface CalendarCardProps { monthLabel: string; mode?: 'month' | 'week' | 'list'; modes?: boolean; onModeChange?: (m: string) => void; offset?: number; days?: number; week?: number[]; selected?: number; today?: number; eventDays?: number[]; legend?: string; onSelect?: (d: number) => void; onPrev?: () => void; onNext?: () => void; onToday?: () => void }
export declare function CalendarCard(props: CalendarCardProps): React.ReactElement;
export interface EventCardProps { day: string; month: string; kind?: string; title: string; lines?: { icon: IconName; text: string }[]; status?: string; statusTone?: Tone; actions?: { label: string; primary?: boolean; icon?: IconName; onClick?: () => void }[] }
export declare function EventCard(props: EventCardProps): React.ReactElement;
export interface FinanceCardProps { kind: string; amount: string; title: string; code?: string; caseCode?: string; court?: string; status?: string; statusTone?: Tone; deadlineLabel?: string; deadline?: string; remain?: string; tone?: Tone; onClick?: () => void }
export declare function FinanceCard(props: FinanceCardProps): React.ReactElement;
export declare function CaseProgress(props: { steps: string[]; current: number; label?: string }): React.ReactElement;
export interface SearchToolbarProps { placeholder: string; defaultValue?: string; count?: string; filterCount?: number; sortLabel?: string; onFilter?: () => void; onSort?: (() => void) | false }
export declare function SearchToolbar(props: SearchToolbarProps): React.ReactElement;
export declare function RatingStars(props: { value?: number; max?: number; label?: string; required?: boolean; onChange?: (v: number) => void }): React.ReactElement;
export interface EmptyStateProps { /** dashed (mặc định): khung nét đứt một hàng · center: giữa màn, biểu tượng 32px + tiêu đề + mô tả. */ variant?: 'dashed' | 'center'; icon?: IconName; /** Chỉ cho variant center. */ title?: string; text?: string; children?: React.ReactNode; actionLabel?: string; actionIcon?: IconName; onAction?: () => void }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;

/* 03/11/2026: thành phần mới từ prototype app TATC */
export interface IconButtonProps { icon: IconName; label: string; /** Chấm đỏ góc trên: đang có điều kiện lọc khác mặc định. */ dot?: boolean; pressed?: boolean; disabled?: boolean; onClick?: () => void }
export declare function IconButton(props: IconButtonProps): React.ReactElement;
export type DueLevel = 'qua' | 'sap' | 'an';
export interface InboxCardProps { kind?: string; /** Màu nhãn loại văn bản, 1–20 (bộ màu Trầm). */ kindColor?: number; code?: string; title: string; court?: string; time?: string; unread?: boolean; starred?: boolean; archived?: boolean; onStar?: () => void; onArchive?: () => void; onClick?: () => void; status?: string; statusTone?: StatusBadgeProps['tone']; deadline?: string; remain?: string; /** qua: còn ≤1 ngày hoặc quá hạn · sap: ≤3 ngày · an: còn hạn */ dueLevel?: DueLevel }
export declare function InboxCard(props: InboxCardProps): React.ReactElement;
export interface ChoiceItem { value: string; label: string; icon?: IconName; /** Màu chấm theo bộ màu nhãn Trầm, 1–20 (ưu tiên hơn color). */ tag?: number; /** Mã màu tùy ý (chỉ khi chưa có trong bộ màu nhãn). */ color?: string; count?: number }
export interface ChoiceListProps { label?: string; items: ChoiceItem[]; value?: string; onChange?: (value: string) => void }
export declare function ChoiceList(props: ChoiceListProps): React.ReactElement;
export interface DocToolbarItem { icon: IconName; label: string; active?: boolean; onClick?: () => void }
export declare function DocToolbar(props: { items: DocToolbarItem[]; label?: string }): React.ReactElement;
export interface IssuerInfoProps { court: string; signer?: string; signerRole?: string; date?: string; linkLabel?: string; linkCode?: string; onLink?: () => void; summary?: string }
export declare function IssuerInfo(props: IssuerInfoProps): React.ReactElement;
export interface DocumentPreviewProps { fileName: string; onOpen?: () => void; openLabel?: string; /** Thay trang thu nhỏ bằng câu thông báo (đang chuẩn bị / không mở được). */ message?: string }
export declare function DocumentPreview(props: DocumentPreviewProps): React.ReactElement;
export interface DeadlineBlockProps { icon?: IconName; title: string; items?: InfoItem[]; roomTitle?: string; room?: InfoItem[]; /** "Hạn: 03/11/2026 · còn 1 ngày" | "Hạn: Vô thời hạn" */ deadline?: string; overdue?: boolean; lockedText?: string | false; actions?: { label: string; disabled?: boolean; onClick?: () => void }[] }
export declare function DeadlineBlock(props: DeadlineBlockProps): React.ReactElement;
export declare function SignatureNote(props: { signedBy: string; servedAt?: string; firstOpened?: string }): React.ReactElement;
export interface UrgencyLevel { key: DueLevel; label: string; description?: string; count: number }
export declare function UrgencySummary(props: { title?: string; levels: UrgencyLevel[] }): React.ReactElement;
export interface TaskCardProps { level?: DueLevel; icon?: IconName; kind?: string; code?: string; title: string; deadline?: string; /** Dòng hạn chữ xám (vd "Không có thời hạn"). */ deadlineMuted?: boolean; actionLabel?: string; onAction?: () => void }
export declare function TaskCard(props: TaskCardProps): React.ReactElement;
export interface DetailHeaderProps { meta?: string; title: string; badges?: React.ReactNode; children?: React.ReactNode; tabs?: TabItem[]; tab?: string; onTab?: (key: string) => void; tabsLabel?: string }
export declare function DetailHeader(props: DetailHeaderProps): React.ReactElement;
export interface Signer { name: string; role?: string; signed?: boolean; signedAt?: string; signLabel?: string; onSign?: () => void }
export declare function SignerList(props: { document?: string; onView?: () => void; signers: Signer[] }): React.ReactElement;
export interface FeatureCardProps { illustration: IllustrationName; title: string; description?: string; disabled?: boolean; onClick?: () => void }
export declare function FeatureCard(props: FeatureCardProps): React.ReactElement;
export declare function FeatureGrid(props: { items?: FeatureCardProps[]; children?: React.ReactNode }): React.ReactElement;

export interface ReminderBannerProps { title: string; actionLabel?: string; onAction?: () => void; /** Mặc định 'yeuCau' (bảng kê có dấu tích). */ illustration?: IllustrationName; /** Có thì hiện nút X (Trang chủ); không có thì không đóng được. */ onClose?: () => void; closeLabel?: string }
export declare function ReminderBanner(props: ReminderBannerProps): React.ReactElement;
export interface AccountBannerProps { name: string; initials: string; role?: string; onRole?: () => void; /** Nhãn định danh, vd "Định danh VNeID". */ verified?: string; verifiedLogo?: string; idLabel?: string; /** Số định danh đã che, vd "•••• •••• 1234". */ idValue?: string; onOpen?: () => void; openText?: string; openLabel?: string }
export declare function AccountBanner(props: AccountBannerProps): React.ReactElement;
export interface TaskRowProps { level?: DueLevel; icon?: IconName; title: string; kind?: string; code?: string; /** "Còn 2 ngày" – tô màu theo level. */ due?: string; dueMuted?: boolean; onClick?: () => void; ariaLabel?: string }
export declare function TaskRow(props: TaskRowProps): React.ReactElement;
export interface SourceItem { key: string; title: string; system?: string; /** 'brand' = nhãn đỏ nhạt; mặc định nhãn vàng. */ tone?: 'gold' | 'brand'; meta?: string; illustration?: IllustrationName }
export declare function SourceSwitch(props: { items: SourceItem[]; value?: string; onChange?: (key: string) => void; label?: string }): React.ReactElement;
export interface CommitCardProps { title: string; code?: string; /** "Điều khoản ngày 02/10/2026" */ date?: string; roles?: string[]; linkLabel?: string; onLink?: () => void }
export declare function CommitCard(props: CommitCardProps): React.ReactElement;
export interface AttachmentSummaryProps { title: string; meta?: string; icon?: IconName; onClick?: () => void }
export declare function AttachmentSummary(props: AttachmentSummaryProps): React.ReactElement;
export interface CardAction { label: string; icon?: IconName; danger?: boolean; onClick?: () => void }
export interface CertificateCardProps { source?: string; subject: string; issuer?: string; status?: string; statusTone?: StatusBadgeProps['tone']; rows?: [string, React.ReactNode][]; actions?: CardAction[] }
export declare function CertificateCard(props: CertificateCardProps): React.ReactElement;
export interface SessionFile { name: string; status: string; ok?: boolean; error?: string; onView?: () => void }
export interface SignSessionCardProps { time: string; title: string; status?: string; statusTone?: StatusBadgeProps['tone']; reason?: string; method: string; methodMeta?: string; role?: string; /** "2/2 tệp" */ fileCount?: string; files?: SessionFile[]; defaultOpen?: boolean }
export declare function SignSessionCard(props: SignSessionCardProps): React.ReactElement;
export interface PlaceCardProps { kind?: string; title: string; address?: string; tags?: string[]; actionLabel?: string; onClick?: () => void }
export declare function PlaceCard(props: PlaceCardProps): React.ReactElement;
export interface DeadlineBarProps { label: string; level?: DueLevel; due?: string; value: number; max: number }
export declare function DeadlineBar(props: DeadlineBarProps): React.ReactElement;
export interface MethodCardProps { icon?: IconName; kind: string; code?: string; title: string; court?: string; via?: string; status?: string; statusTone?: StatusBadgeProps['tone']; roles?: string[]; children?: React.ReactNode }
export declare function MethodCard(props: MethodCardProps): React.ReactElement;

declare global { interface Window { TuPhap: { Icon: typeof Icon; Button: typeof Button; LinkArrow: typeof LinkArrow; SectionHeader: typeof SectionHeader; HeroBanner: typeof HeroBanner; ServiceCard: typeof ServiceCard; ProcessSteps: typeof ProcessSteps; Illustration: typeof Illustration; HomeHeader: typeof HomeHeader; BannerCarousel: typeof BannerCarousel; QuickAction: typeof QuickAction; NewsCard: typeof NewsCard; FormSection: typeof FormSection; SelectField: typeof SelectField; OptionItem: typeof OptionItem; SummaryBar: typeof SummaryBar; SheetMenu: typeof SheetMenu; FilterCard: typeof FilterCard; RecordCard: typeof RecordCard; ChatFab: typeof ChatFab; illustrationNames: IllustrationName[]; TextField: typeof TextField; StatusBadge: typeof StatusBadge; Tabs: typeof Tabs; ServiceTile: typeof ServiceTile; CaseCard: typeof CaseCard; Timeline: typeof Timeline; AppBar: typeof AppBar; BottomNav: typeof BottomNav; iconNames: IconName[]; Stepper: typeof Stepper; FileUpload: typeof FileUpload; FileItem: typeof FileItem; Checkbox: typeof Checkbox; SegmentedControl: typeof SegmentedControl; BackLink: typeof BackLink; Tag: typeof Tag; Notice: typeof Notice; InfoList: typeof InfoList; ActionBar: typeof ActionBar; Dialog: typeof Dialog; Accordion: typeof Accordion; TaskList: typeof TaskList; StatSummary: typeof StatSummary; MenuList: typeof MenuList; ProfileCard: typeof ProfileCard; MailList: typeof MailList; NotificationList: typeof NotificationList; CalendarCard: typeof CalendarCard; EventCard: typeof EventCard; FinanceCard: typeof FinanceCard; CaseProgress: typeof CaseProgress; SearchToolbar: typeof SearchToolbar; RatingStars: typeof RatingStars; EmptyState: typeof EmptyState; IconButton: typeof IconButton; InboxCard: typeof InboxCard; ChoiceList: typeof ChoiceList; DocToolbar: typeof DocToolbar; IssuerInfo: typeof IssuerInfo; DocumentPreview: typeof DocumentPreview; DeadlineBlock: typeof DeadlineBlock; SignatureNote: typeof SignatureNote; UrgencySummary: typeof UrgencySummary; TaskCard: typeof TaskCard; DetailHeader: typeof DetailHeader; SignerList: typeof SignerList; FeatureCard: typeof FeatureCard; FeatureGrid: typeof FeatureGrid; ReminderBanner: typeof ReminderBanner; AccountBanner: typeof AccountBanner; TaskRow: typeof TaskRow; SourceSwitch: typeof SourceSwitch; CommitCard: typeof CommitCard; AttachmentSummary: typeof AttachmentSummary; CertificateCard: typeof CertificateCard; SignSessionCard: typeof SignSessionCard; PlaceCard: typeof PlaceCard; DeadlineBar: typeof DeadlineBar; MethodCard: typeof MethodCard } } }
