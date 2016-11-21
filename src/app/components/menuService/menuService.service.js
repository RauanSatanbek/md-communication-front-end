export  class MenuService{
  constructor (){
    var self = this;

    self.menuItems = [
      {
        title : 'Заявки',
        state : 'ticket'
      },
      {
        title : 'Сотрудники',
        state : 'user'
      },
      {
        title : 'Клиенты',
        state : 'client'
      },
      {
        title : 'Задачи',
        state : 'supply'
      },
      {
        title : 'Обсуждение',
        state : 'payments'
      },
      {
        title : 'Дела',
        state : 'staff'
      },
      {
        title : 'Сделки',
        state : 'staff'
      },
      {
        title : 'Счета',
        state : 'staff'
      },
      {
        title : 'Документы',
        state : 'staff'
      },
      {
        title : 'Отчеты',
        state : 'staff'
      },
      {
        title : 'Письма',
        state : 'staff'
      }
    ];

    self.menuObject = {
      'ticket': 'Заявки',
      'user': 'Сотрудники',
      'client': 'Клиенты'
    };

  }
}
