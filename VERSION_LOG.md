# Version Log

## 2026-05-17 - pre-517-complete-feature-restore

- Commit: `73f1fdcadfa73bc5abc3620465608dfbed2b0156`
- Scope: Restore the pre-5/17 complete feature set requested by the user.
- Restored: `方舟複盤`, `持股明細`, `歷史績效`, `智慧工具`, `複盤指令`.
- Included tools: CSV import, target price consensus, portfolio stress test, voice review reading, local history snapshots.
- Recovery note: to restore this version later, reset `main` to commit `73f1fdcadfa73bc5abc3620465608dfbed2b0156`.

## 2026-05-17 - restore-core-tools

- Commit: `44adc0a9d7dcda0c599801d91d0d88a86263821a`
- Scope: Restore the core public site features after the layout regression.
- Restored: `方舟複盤`, `持股明細`, `智慧工具`, `複盤指令`.
- Removed from public page: the previously added 3D flowchart block that damaged the layout.
- Recovery note: to restore this version later, reset `main` to commit `44adc0a9d7dcda0c599801d91d0d88a86263821a`.

## 2026-05-17 - safe-base-restore

- Commit: `a4b9d81b4d32023374d7311e16723d99f098adf7`
- Scope: Restored repository to the safe base after a broken simplified overwrite and removed temporary chunk file.
- Recovery note: use this only if you want the original basic page before the restored smart tools.
