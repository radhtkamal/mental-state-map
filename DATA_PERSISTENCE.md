# Data Persistence & Backup Guide

## 🔒 Storage Upgrade: localStorage → IndexedDB

Your Mental State Weather Map now uses **IndexedDB** instead of `localStorage` for better reliability and larger storage capacity.

### Why IndexedDB?

| Feature | localStorage | IndexedDB |
|---------|-------------|-----------|
| Storage limit | ~5-10MB | ~50MB+ |
| Safari PWA persistence | 7 days (buggy) | Long-term (reliable) |
| iOS app-like behavior | Unpredictable | Guaranteed |
| Data structure | JSON strings | Structured database |
| Speed | Synchronous (blocking) | Asynchronous (fast) |

### What This Means for You

✅ **Data persists** even when you add the app to your home screen  
✅ **Safari PWA support** — more than 7 days without clearing data  
✅ **Larger storage** — store months of data without worry  
✅ **Automatic syncing** — changes saved instantly to IndexedDB  

---

## 📥 Export Your Data

### Manual Backup

Go to either **Weather Map** or **Task Log** page and scroll to the bottom to find:

**💾 Data Backup & Recovery**
- **Export All** — Download all mental state and task data as JSON
- **Export Tasks** — Download only task data as JSON
- **Import Data** — Restore from a previously exported backup

### How to Export

1. Click **"Export All"** button
2. A JSON file downloads: `mental-state-map-full-backup-2025-01-01.json`
3. Save it somewhere safe (Dropbox, iCloud, etc.)

### How to Import

1. Click **"Import Data"** button
2. Select your `.json` backup file
3. Data restores automatically
4. Refresh the page if needed

---

## 📊 Backup Formats

### Full Backup (All Data)
```json
{
  "version": "1.0",
  "exportedAt": "2025-01-01T21:00:00Z",
  "mentalState": {
    "id": "current",
    "currentState": "clear",
    "lastUpdated": "2025-01-01T21:00:00Z",
    "updateCount": 2,
    "history": [...]
  },
  "tasks": {
    "2025-01-01": {
      "clear": [...],
      "noisy": [...],
      "overwhelmed": [],
      "low": [...]
    }
  }
}
```

### Tasks Only Backup
```json
{
  "version": "1.0",
  "exportedAt": "2025-01-01T21:00:00Z",
  "tasks": {
    "2025-01-01": {...},
    "2024-12-31": {...}
  }
}
```

---

## 🌐 Using as a PWA (Progressive Web App)

### iOS (Safari)

1. Open the app in Safari: `http://localhost:5173` (or your hosted URL)
2. Tap **Share** → **Add to Home Screen**
3. Name it "Mental State Map"
4. Open it from home screen
5. **Data persists** across sessions (no 7-day limit anymore!)

### Android (Chrome)

1. Open the app in Chrome
2. Menu → **Install app**
3. Choose "Install"
4. Open from home screen
5. **Full data persistence** with IndexedDB

---

## 🛡️ Data Safety Tips

### Weekly Backup Routine

1. Go to Weather Map or Task Log
2. Click **"Export All"**
3. Save to cloud storage (Google Drive, Dropbox, iCloud)
4. Set reminder for weekly exports

### Before Clearing Browser Data

1. **Export your data** first
2. Clear browser cache/cookies
3. **Import your data** back if needed

### Sharing Data

✅ Safe to share JSON backup files (they're just text)  
✅ Great for migrating between devices  
✅ Good for long-term archival  

---

## 🔄 Technical Details

### How Data is Stored

```
Browser IndexedDB
├── mentalState (object store)
│   └── "current" → { currentState, lastUpdated, history, ... }
└── tasks (object store)
    ├── "2025-01-01" → { clear: [...], noisy: [...], ... }
    ├── "2024-12-31" → { clear: [...], noisy: [...], ... }
    └── ... (per date)
```

### Automatic Syncing

- ✅ Changes save **immediately** to IndexedDB
- ✅ Works **offline** (data doesn't need internet)
- ✅ Syncs across **browser tabs** in real-time
- ✅ No data loss on **app refresh** or **navigation**

### Storage Limits

- **Desktop browsers**: ~50MB (varies by browser)
- **iOS Safari PWA**: ~50MB guaranteed
- **Android Chrome PWA**: ~100MB+ available

---

## ⚠️ Important Notes

### Clearing Browser Data

If you accidentally clear browser data:
1. Don't panic! IndexedDB might still have your data
2. If lost, **import your backup** from exports
3. This is why regular exports are important!

### Device Migration

To move data to a new device:
1. **Export** on old device
2. Download the JSON file to cloud
3. **Import** on new device
4. All your data transfers instantly

### Privacy

- ✅ All data stored **locally** in IndexedDB
- ✅ **Never sent** to external servers
- ✅ Only you have access to your data
- ✅ Exports are unencrypted JSON (optional: encrypt before backup)

---

## 🚀 Best Practices

1. **Export weekly** → Download backup to safe location
2. **Use PWA mode** → Add to home screen for app-like experience
3. **Check storage** → Monitor how much data you're storing
4. **Import periodically** → Test that your backups work

---

**Questions?** Check the [README.md](./README.md) for more info!

