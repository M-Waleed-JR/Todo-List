import Swal from "sweetalert2";

/**
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.text
 * @param {Function} options.onConfirm
 * @param {Function} [options.onCancel]
 */

export const showDeleteConfirm = ({
  title = "هل أنت متأكد؟",
  text = "تريد حذف هذه المهمة نهائياً",
  onConfirm,
  onCancel,
}) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#059669",
    cancelButtonColor: "#e11d48",
    confirmButtonText: "نعم، أحذفه!",
    cancelButtonText: "لا الغي",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "تم الحذف",
        text: "تم حذف المهمة بنجاح",
        icon: "success",
        confirmButtonColor: "#059669",
      });
      if (onConfirm) onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "تم الالغاء",
        text: "لم يتم حذف المهمة",
        icon: "error",
        confirmButtonColor: "#4f46e5",
      });
      if (onCancel) onCancel();
    }
  });
};

/**
 * @param {Object} options
 * @param {string} [options.initialTitle]
 * @param {string} [options.initialDetails]
 * @param {Function} options.onConfirm
 */

export const showEditTask = ({
  initialTitle = "",
  initialDetails = "",
  onConfirm,
}) => {
  Swal.fire({
    title: "تعديل المهمة",
    html: `
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
        <input 
          id="swal-input1" 
          class="swal2-input" 
          placeholder="ادخل عنوان المهمة" 
          value="${initialTitle}"
          style="margin: 0; width: 100%; box-sizing: border-box; font-family: inherit;"
        >
        <input
          id="swal-input2"
          class="swal2-input"
          placeholder="ادخل تفاصيل المهمة"
          value="${initialDetails}"
          style="margin: 0; width: 100%; box-sizing: border-box; font-family: inherit;"
        >
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "تعديل",
    cancelButtonText: "الغاء",
    confirmButtonColor: "#059669",
    cancelButtonColor: "#e11d48",
    customClass: {
      popup: "custom-swal-popup",
    },
    preConfirm: () => {
      const title = document.getElementById("swal-input1").value.trim();
      const details = document.getElementById("swal-input2").value.trim();

      if (!title) {
        Swal.showValidationMessage("عنوان المهمة مطلوب!");
        return false;
      }
      return { title, details };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      if (onConfirm) onConfirm(result.value);
    }
  });
};
