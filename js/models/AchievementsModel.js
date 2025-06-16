/* ACHIEVEMENTS */
class Achievement {
  achievements = [];
  localStorageAchievementKey = 'achievementKeys';

  constructor(achievements) {
    this.achievements = achievements;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageAchievementKey, JSON.stringify(this.achievements));
  }

  add(key, title, description, img, condition, status = true) {
    this.achievements[key] = {
      title,
      description,
      img,
      condition,
      status
    }
    this.saveToLocalStorage();
  }

  del(key) {
    delete this.achievements[key];
    this.saveToLocalStorage();
  }

  get(key) {
    return this.achievements[key];
  }

  getAll() {
    return this.achievements;
  }

}