<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const leads = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/leads/');
    leads.value = response.data._embedded.leads.map((lead) => ({
      key: lead.id,
      name: lead.name,
      price: lead.price,
      status_id: lead.status_id,
      responsible_user_id: lead.responsible_user_id,
      created_at: new Date(lead.created_at * 1000).toLocaleString(),
      contacts: lead._embedded.companies.map(company => ({
        id: company.id,
        href: company._links.self.href
      }))
    }));
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});

const columns = [
  { title: 'Название', dataIndex: 'name', key: 'name' },
  { title: 'Цена', dataIndex: 'price', key: 'price' },
  { title: 'Статус ID', dataIndex: 'status_id', key: 'status_id' },
  { title: 'Ответственный ID', dataIndex: 'responsible_user_id', key: 'responsible_user_id' },
  { title: 'Дата создания', dataIndex: 'created_at', key: 'created_at' },
];

</script>

<template>
  <div class="p-10">

    <a-table :columns="columns" :data-source="leads" :pagination="false">
      <template #expandedRowRender="{ record }">
        <ul>
          <li v-for="contact in record.contacts" :key="contact.id">
            <a :href="contact.href">Контакт {{ contact.id }}</a>
          </li>
        </ul>
      </template>
    </a-table>

  </div>
</template>