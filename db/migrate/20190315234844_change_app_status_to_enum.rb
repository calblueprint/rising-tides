class ChangeAppStatusToEnum < ActiveRecord::Migration[5.2]
  def change
    def up
        change_column_default :applications, :status, nil
        change_column :applications, :status, "integer USING (CASE status WHEN 'pending' THEN '0'::integer WHEN 'denied' THEN '1'::integer WHEN 'interviewing' THEN '2'::integer ELSE '3'::integer END)", null: false, default: 0
      end

      def down
        change_column_default :applications, :status, nil
        change_column :applications, :status, "varchar USING (CASE status WHEN '0' THEN 'pending'::varchar WHEN '1' THEN 'denied'::varchar WHEN '2' THEN 'interviewing'::varchar ELSE 'accepted'::varchar END)", null: false, default: 'pending'
      end
  end
end
