import React from 'react';

import restProvider from 'ra-data-simple-rest';
import UserList from '@/app/components/Admin/UserList';
import  UserEdit from '@/app/components/Admin/UserEdit';
import  ProductEdit from '@/app/components/Admin/ProductEdit';
import  ProductList from '@/app/components/Admin/ProductList';
import { Admin, Resource } from 'react-admin';

const AdminPanel = () => {
  return (
    <div>
      <Admin dataProvider={restProvider('http://localhost:3000')}>
        <Resource 
        name='users' 
        list={UserList}
         edit={UserEdit}
         />
           <Resource 
        name='Product' 
        list={ProductList}
         edit={ProductEdit}/>
      </Admin>
    </div>
  );
}

export default AdminPanel;