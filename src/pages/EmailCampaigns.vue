<template>
  <q-page class="email-campaigns-page">
      <div class="page-toolbar flex justify-between items-center q-px-lg q-py-sm">
        <div class="page-header">All Campaigns (24)</div>

        <div class="flex">
          <q-input bg-color="secondary"
          outlined v-model="filter" dense
          placeholder="Search Campaigns" class="q-mr-lg search-input">
            <template v-slot:prepend>
              <q-icon name="fas fa-magnifying-glass" size="xs" />
            </template>
          </q-input>
          <q-btn color="accent" icon="add" label="Add Campaign" no-caps />
        </div>
      </div>
      <div class="q-pa-md">
        <q-table
          flat bordered
          :rows="rows"
          :columns="columns"
          row-key="name"
          selection="multiple"
          v-model:selected="selected"
          :filter="filter"
          dense
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width>
                <q-checkbox v-model="props.selected" color="accent" />
              </q-th>
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-checkbox v-model="props.selected" color="accent" />
              </q-td>
              <q-td
                key="campaign_details"
                :props="props"
              >
                <q-item dense>
                  <q-item-section avatar>
                    <q-knob
                      disable
                      v-model="props.row.progress"
                      show-value
                      size="50px"
                      :thickness="0.22"
                      color="positive"
                      track-color="grey-3"
                      class="text-primary q-ma-md"
                    >
                      <template v-if="props.row.progress === 0">
                        <q-img src="/drafted.svg" height="16px" width="16px" />
                      </template>
                      <template v-else>
                        {{ `${props.row.progress}%` }}
                      </template>
                    </q-knob>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <span class="campaign-title">{{ props.row.name }}</span>
                      <q-img src="/tab.svg" class="q-ml-sm" height="16px" width="16px" />
                    </q-item-label>
                    <q-item-label caption lines="1">
                      <span class="dot bg-primary" v-if="props.row.progress > 0"></span>
                      <span class="dot bg-grey" v-else></span>
                      <span>Sent on {{ props.row.date }}</span>
                      <span class="divider q-px-xs"> | </span>
                      <span>{{ props.row.sequence }} Sequences</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-td>
              <q-td
                key="report"
                :props="props"
              >
              <div class="flex justify-between items-center">
                <q-item>
                  <q-item-section>
                    <q-item-label
                    :class="['stats-title', props.row.sent > 0 ? 'text-accent' : 'text-grey' ]">
                      {{ props.row.sent }}<sub></sub>
                    </q-item-label>
                    <q-item-label caption>Sent</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label
                    :class="['stats-title', props.row.clicked > 0 ?
                    'text-positive' : 'text-grey' ]">
                      {{ props.row.clicked }}<sub>{{ props.row.clickedPercent }}</sub>
                    </q-item-label>
                    <q-item-label caption>
                      Clicked<q-icon class="q-ml-xs" name="warning"
                      color="warning" v-if="props.row.sent === 0"/>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label
                    :class="['stats-title', props.row.opened > 0 ? 'text-negative' : 'text-grey' ]">
                      {{ props.row.opened }}<sub>{{ props.row.openedPercent }}</sub>
                    </q-item-label>
                    <q-item-label caption>
                      Opened<q-icon class="q-ml-xs" name="warning"
                      color="warning" v-if="props.row.sent === 0"/>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label
                    :class="['stats-title', props.row.replied > 0 ? 'text-info' : 'text-grey' ]">
                      {{ props.row.replied }}<sub>{{ props.row.repliedPercent }}</sub>
                    </q-item-label>
                    <q-item-label caption>
                      Replied<q-icon class="q-ml-xs" name="warning"
                      color="warning" v-if="props.row.sent === 0"/>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label
                    :class="['stats-title', props.row.positiveReply > 0 ?
                    'text-warning' : 'text-grey' ]">
                      {{ props.row.positiveReply }}<sub>{{ props.row.positiveReplyPercent }}</sub>
                    </q-item-label>
                    <q-item-label caption>
                      Positive Reply
                      <q-icon name="info" v-if="props.row.sent === 0"/>
                      <q-icon name="fas fa-info" class="outlined-info" v-else />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-btn square dense flat class="action-button">
                  <q-img src="/pause.svg" height="18px" width="18px" />
                </q-btn>

                <q-btn square dense flat class="action-button">
                  <q-img src="/edit.svg" height="18px" width="18px" />
                </q-btn>

                <q-btn square dense flat class="action-button">
                  <q-img src="/more.svg" height="18px" width="18px" />
                </q-btn>
              </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { columns, rows } from '../data/emailCampaigns';

export default defineComponent(
  {
    name: 'EmailCampaigns',
    setup() {
      const selected = ref([]);
      const filter = ref('');

      return {
        selected,
        filter,
        columns,
        rows,
      };
    },
  },
);
</script>

<style scoped>
  .email-campaigns-page{
    background-color: #F7F8FE;
  }
  .page-toolbar{
    background-color: #ffffff;
  }
  .page-header{
    font-size: 16px;
    color: #282B42;
    font-weight: 500;
    position: relative;
  }
  .page-header::after{
    content: '';
    position: absolute;
    height: 4px;
    width: 39px;
    background-color: #757AE9;
    bottom: -17px;
    right: 50%;
    transform: translate(50%, -50%);
    border-radius: 8px 8px 0 0;
  }
  .search-input{
    width: 300px;
  }
  thead{
    background-color: #E9EBF9;
  }
  th{
    color: #686B8A;
    font-size: 16px !important;
    font-weight: 500 !important;
  }
  .q-checkbox__bg{
    border-color: #DADCE0;
    background-color: #ffffff;
    border-radius: 4px;
  }
  .action-button{
    border: 1px solid #E5E7F9;
    border-radius: 4px;
    height: 36px;
    width: 36px;
  }
  .stats-title{
    font-size: 20px;
    font-weight: 500;
  }
  .dot{
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 2px;
  }
  .campaign-title{
    color: #6E58F1;
    font-size: 15px;
    font-weight: 500;
  }
  sub{
    color: #999BA8;
    font-size: 12px;
  }
  .outlined-info{
    border: 1px solid currentColor;
    border-radius: 50%;
    padding: 2px;
    font-size: 6px;
  }
</style>
