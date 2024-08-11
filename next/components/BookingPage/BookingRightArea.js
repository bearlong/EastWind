import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PartyNav from '../partypages/PartyNav';

const rules = [
  { id: 'eightImmortals', label: '八仙過海' },
  { id: 'noLean', label: '不靠牌' },
  // 添加更多規則...
];

export default function BookingRightArea() {
  const [bookingData, setBookingData] = useState({
    date: new Date(),
    startTime: '',
    endTime: '',
    area: '',
    rules: [],
  });

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleRuleChange = (e) => {
    const { value, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      rules: checked 
        ? [...prev.rules, value]
        : prev.rules.filter(rule => rule !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking data:', bookingData);
    // 這裡可以添加提交邏輯，例如發送到API
  };

  return (
    <div className="rightArea col-4 g-3">
    <PartyNav/>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title gw-bb w-100">麻將大師板橋一店</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="datepicker" className="form-label"><h6>日期</h6></label>
              <DatePicker
                id="datepicker"
                selected={bookingData.date}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="form-control w-100"
              />
            </div>

            <div className="timecontrol gw-bb">
              <div className="timeBox startTime">
                <label htmlFor="startTime" className="form-label"><h6>開始時間</h6></label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="form-control"
                  value={bookingData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="timeBox endTime">
                <label htmlFor="endTime" className="form-label"><h6>結束時間</h6></label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="form-control"
                  value={bookingData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="gw-bb w-100 mb-3">
              <label htmlFor="area" className="form-label"><h5>區域</h5></label>
              <select
                id="area"
                name="area"
                className="form-select p"
                value={bookingData.area}
                onChange={handleInputChange}
                required
              >
                <option value="">選擇區域</option>
                <option value="大廳">大廳</option>
                <option value="包廂">包廂</option>
              </select>
            </div>

            <div className="mb-3">
              <h5>規則選擇</h5>
              {rules.map(rule => (
                <div key={rule.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={rule.id}
                    value={rule.id}
                    checked={bookingData.rules.includes(rule.id)}
                    onChange={handleRuleChange}
                  />
                  <label className="form-check-label" htmlFor={rule.id}>
                    {rule.label}
                  </label>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary">預訂</button>
          </form>
        </div>
      </div>
    </div>
  );
}