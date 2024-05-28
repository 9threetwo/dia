import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Input from "../components/special/Input";
import Button from "../components/special/Button";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import DateTable from "../components/special/DateTable";
import * as XLSX from "xlsx";
import _ from "lodash";

function DataPage() {
  const today = new Date().toISOString().split("T")[0];
  const { user, chartData } = useSelector((store) => store.user);
  const initialState = {
    date: today,
  };

  const [values, setValues] = useState(initialState);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const formattedDate = dayjs(user.date).format("DD.MM.YYYY");

  const filteredChartData = chartData.filter((data) => {
    return dayjs(data.date).format("YYYY-MM-DD") === values.date;
  });

  const formatData = (data) => {
    return _.map(data, (item) => {
      let ckMessage = "";
      if (item.ck > 0 && item.ck < 4) {
        ckMessage =
          "Не вводите инсулин до нормального уровня ГК. Срочно повысьте СК";
      } else if (item.ck >= 4 && item.ck <= 10) {
        ckMessage = "Уровень ГК в пределах нормы";
      } else if (item.ck > 10) {
        ckMessage = "Наблюдайте за уровнем ГК в течении 1-1,5 ч";
      }

      return {
        date: dayjs(item.date).format("DD.MM.YYYY"),
        time: item.time,
        ck: item.ck,
        xe: item.xe,
        insulin: item.insulin,
        comment: item.comment,
        ckMessage: ckMessage,
      };
    });
  };

  const exportToExcel = () => {
    const formattedData = formatData(filteredChartData);

    const userData = [
      { key: "ФИО", value: user.name },
      { key: "Дата рождения", value: formattedDate },
      { key: "Пол", value: user.gender === "m" ? "Мужской" : "Женский" },
      { key: "Вес", value: `${user.weight} кг.` },
      { key: "Тип", value: user.type },
      { key: "Стаж заболевания", value: user.experience },
      { key: "Лекарство", value: user.medicine },
      { key: "Осложнение", value: user.complication },
      { key: "Целевой диапазон", value: `${user.min} - ${user.max}` },
    ];

    const formattedUserData = userData.map((item) => ({
      key: item.key,
      value: item.value,
    }));

    const combinedData = [
      ...formattedUserData,
      {},
      {
        key: "Дата",
        time: "Время",
        ck: "СК",
        xe: "ХЕ",
        insulin: "Инсулин",
        comment: "Комментарий",
        ckMessage: "Помощник",
      },
      ...formattedData,
    ];

    const ws = XLSX.utils.json_to_sheet(combinedData);
    ws["!cols"] = [
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 70 },
      { wpx: 70 },
      { wpx: 70 },
      { wpx: 100 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 100 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    XLSX.writeFile(wb, "report.xlsx");

    // const wsUser = XLSX.utils.json_to_sheet(userData);
    // wsUser["!cols"] = [{ wpx: 200 }, { wpx: 200 }];

    // const wsChart = XLSX.utils.json_to_sheet(formattedData);
    // wsChart["!cols"] = [
    //   { wpx: 70 },
    //   { wpx: 70 },
    //   { wpx: 70 },
    //   { wpx: 70 },
    //   { wpx: 70 },
    //   { wpx: 100 },
    //   { wpx: 200 },
    // ];
    // wsChart["!rows"] = formattedData.map(() => ({ hpx: 50 }));

    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, wsUser, "User Data");
    // XLSX.utils.book_append_sheet(wb, wsChart, "Chart Data");

    // XLSX.writeFile(wb, "report.xlsx");
  };

  return (
    <>
      <Header />
      <Wrapper>
        <div className="in">
          <p>Выберите дату:</p>
          <Input
            width="200px"
            height="30px"
            type="date"
            name="date"
            value={values.date}
            onChange={changeHandler}
            autoComplete="off"
          />
          <Button
            text="скачать отчет"
            width="200px"
            height="30px"
            onClick={exportToExcel}
          />
        </div>
        <div className="content">
          <div className="block">
            <div className="user-info">
              <div className="line">
                <p className="key">ФИО</p>
                <p className="value">{user.name}</p>
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Дата рождения</p>
                <p className="value">{formattedDate}</p>
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Пол</p>
                {user.gender === "m" && <p className="value">Мужской</p>}
                {user.gender !== "m" && <p className="value">Женский</p>}
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Вес</p>
                <p className="value">{user.weight} кг.</p>
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Тип</p>
                <p className="value">{user.type} </p>
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Стаж заболевания</p>
                <p className="value">{user.experience} </p>
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Лекарcтво</p>
                <p className="value">{user.medicine} </p>
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Осложнение</p>
                <p className="value">{user.complication} </p>
              </div>
            </div>
            <div className="user-info">
              <div className="line">
                <p className="key">Целевой диапазон</p>
                <p className="value">
                  {user.min} - {user.max}
                </p>
              </div>
            </div>
          </div>
          <div className="block2">
            <div className="header">
              <p>Время</p>
              <p>СК</p>
              <p>ХЕ</p>
              <p>Инсулин</p>
              <p>Комментарий</p>
              <p>Помощник</p>
            </div>

            <DateTable chartData={filteredChartData} />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  overflow: hidden;
  .in {
    input {
      margin: 10px 0;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .block {
    width: max-content;
    margin: 20px 0;
    padding: 15px;
    .line {
      display: flex;
      margin: 10px 0;
      p {
        margin: 5px;
      }
      .key {
        color: var(--blue-2);
        font-weight: 500;
        width: 120px;
        font-size: 14px;
      }
      .value {
        color: var(--blue-0);
        font-weight: 500;
        width: 170px;
        font-size: 14px;
      }
    }
  }
  .block2 {
    display: flex;
    .header {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 300px;
      margin: 20px 0;
      padding: 15px;
      font-weight: 600;
      p {
        margin: 10px;
      }
    }
  }
  @media (min-width: 992px) {
    .content {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      .block {
        width: 400px;
      }
    }
  }
`;
export default DataPage;
