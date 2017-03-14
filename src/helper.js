export default class DistrictRepository {
  constructor(data) {
    this.data = this.removeDuplicates(data);
  }

  removeDuplicates(data) {
    let mapped = data.map(obj => {
       obj.Location = obj.Location.toUpperCase();
       return obj;
    });
    return mapped.reduce((acc, val)=> {
      if (!acc[val.Location]) {
        acc[val.Location] = { locationData: [],
                              location: val.Location,
                              data: this.sanitizeData(data)
                            };
      }
      acc[val.Location].locationData.push(val);
      return acc;
    }, {});
  }

  findByName(name) {
    if (!name) {
      return undefined;
    }
    const upperCaseName = name.toUpperCase();
    const keys = Object.keys(this.data);
    if (!keys.includes(upperCaseName)) {
      return undefined;
    }
    const dataArray = this.data[upperCaseName].locationData;
    this.sanitizeData(dataArray);

    return this.data[upperCaseName];
  }

  sanitizeData(data) {
    const sanitized = data.map(location => {
      typeof location.Data !== 'number' ? location.Data = 0 : location.Data;
      return location;
    });
    return this.formatData(sanitized);
  }

  formatData(data) {
    return data.reduce((obj, val) => {
      obj[val.TimeFrame] = val.Data
      return obj;
    }, {});
  }

}
