# 김미애 국회의원 홍보 사이트

Vite + React + TypeScript + Tailwind v4. 정적 빌드(`dist/`)를 Firebase Hosting 또는 Cloudflare Pages에 올립니다.

## 실행
```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 검사 + 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 문구·수치 교체 (코드 수정 불필요)
모든 문구, 수치, 링크, 모드 스위치는 `src/content/site.json` 하나에서 관리합니다.

- `stats`: 숫자 카운터 4칸 (value는 숫자, suffix는 단위, note에 출처와 기준일)
- `achievements`: 대표 성과 카드
- `timeline`: 의원 소개 타임라인
- `news`: 최근 소식 (date, title, href, image)
- `video.youtubeId`: 유튜브 영상 ID. 비워 두면 영상 영역이 숨겨짐
- `contact.endpoint`: 민원 폼 전송 주소 (Formspree 또는 Firebase Function). 비워 두면 전송 버튼이 잠김
- `issues`: 지역 현안 카드. **빈 배열이면 섹션 전체가 숨겨짐**

## 모드 스위치
- `"mode": "assembly"` 평상시 (기본). 후원·지지·투표 독려 문구는 노출하지 않습니다.
- `"mode": "campaign"` 선거 모드. **선관위 또는 법률 검토 완료 전에는 켜지 마세요.** 이 모드를 켜는 책임은 의원실에 있습니다.

## 이미지
`public/images/README.md`의 파일명 규칙대로 Canva에서 내보낸 파일을 넣으면 됩니다.

## 배포 (주소: https://haeundae.web.app)
Firebase Hosting 사이트 ID는 `haeundae`입니다 (`firebase.json`의 `site`). 처음 한 번만 필요합니다.

```bash
npm install && npm run build
npx firebase-tools login
npx firebase-tools hosting:sites:create haeundae   # 사이트가 없을 때만
npx firebase-tools deploy --only hosting           # 이 폴더에서 실행
```

- `haeundae.web.app` 이름이 이미 사용 중이면 생성에 실패합니다. 그 경우 사이트 ID를 바꾸고 `firebase.json`을 수정하세요.
- 게시 전 `TODO.md` 확인과 의원실 승인이 필요합니다.

## 배포 주의
현재 저장소 루트의 `firebase.json`은 `public: "."`입니다. 이 폴더를 루트 배포에 섞으면 소스 파일이 공개됩니다. 이 사이트는 `dist/`만 따로 배포하도록 설정해 주세요.
